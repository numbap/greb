const AWS = require("aws-sdk");
const fetch = require("node-fetch");
const ipRegex = require('ip-regex');


const commaTabLatLon = (str) =>
{
  var patt = /^((\-?|\+?)?\d+(\.\d+)?)(,|\t|[\s]+)\s*((\-?|\+?)?\d+(\.\d+)?)$/
  if(patt.test(str)){

    if(RegExp(/\t/).test(str)){
        return str.replace(/\t/, ",").split(",").map(Number)
    } else if (RegExp(/[\s]+/).test(str)){
        return str.replace(/[\s]+/, ",").split(",").map(Number)
    } else {
        return str.split(",").map(Number)
    }
  } else {
    return false;
  }
}


exports.handler = async (event) => {
  const documentClient = new AWS.DynamoDB.DocumentClient();
  var bodyResponse = {};
  let userSub = event.user || null;
  let userAccount = "";
  var geoString = encodeURI(JSON.parse(event.body).geoString);
  var LatLonInfo = null;
  var LatLonResults = null;
  let responseBody;
  let statusCode;
  let deleteErr

console.log(process.env, "process.env")

  if (
    event.requestContext &&
    event.requestContext.identity.cognitoAuthenticationProvider
  ) {
    userSub = event.requestContext.identity.cognitoAuthenticationProvider.split(
      ":CognitoSignIn:"
    )[1];
  }
  // userSub = userSub ? userSub : "a7a29baa-790d-456d-8342-85d5d76d1227";

  var paramsGet = {
    TableName: "Accounts",
    IndexName: "userId-index",
    KeyConditionExpression: "#userId = :userIDValue",
    ExpressionAttributeNames: {
      "#userId": "userId",
    },
    ExpressionAttributeValues: {
      ":userIDValue": userSub,
    },
  };



  if (userSub) {
    try {
      console.log("Get User Info - Start")
      console.log(paramsGet)
      userAccount = await documentClient.query(paramsGet).promise();
      console.log("Get User Info - End")
    } catch (err) {
      const response = {
        statusCode: 403,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*", // Required for CORS support to work
        },
        body: JSON.stringify({ err: err, froo: "Could not query" }),
      };
      return response;
    }
  }

  try {
    if (userSub && userAccount.Items[0] && userAccount.Items[0].credits > 0) {

      if(commaTabLatLon(JSON.parse(event.body).geoString)){
        console.log("CommaTabLatLon - Start")
        // Test if it's a lat/lon combination
        let geoUrl = commaTabLatLon(JSON.parse(event.body).geoString);
        LatLonResults = { lat: geoUrl[0], lon: geoUrl[1], name: "Geocoordinates" };
        LatLonResults.credits = userAccount.Items[0].credits - 1;
        console.log("CommaTabLatLon - End")
      }     
      else {
        if(ipRegex.v6({exact: true}).test(JSON.parse(event.body).geoString) || ipRegex.v4({exact: true}).test(JSON.parse(event.body).geoString))
        {
          console.log("Turn IP into lat/lon")
          // Test if it's an IP address
          let geoUrl = `http://ip-api.com/json/${JSON.parse(event.body).geoString}`;
          const tmpGeo = JSON.parse(await fetch(geoUrl).then((res) => res.text()));
          LatLonResults = { lat: tmpGeo.lat ? tmpGeo.lat : 0, lon: tmpGeo.lon ? tmpGeo.lon : 0, name: geoString };
          LatLonResults.credits = userAccount.Items[0].credits - 1;
        } else {
          let geoUrl = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_PK}&format=json&q=${geoString}`;
          console.log("Turn Address into GEO", geoUrl)
          LatLonInfo = await fetch(geoUrl).then((res) => res.text());
          LatLonResults = JSON.parse(LatLonInfo)[0];
          LatLonResults.credits = userAccount.Items[0].credits - 1;
        }
      }


    }
  } catch (err) {
    responseBody = {
      err: err,
      froo: "Could not get location",
    };
    statusCode = 403;
    const response = {
      statusCode: statusCode,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*", // Required for CORS support to work
      },
      body: JSON.stringify(responseBody),
    };

    return response;
  }

  // Return error message if zero credits
  if (userSub && userAccount.Items[0] && userAccount.Items[0].credits < 1) {
    LatLonResults = { lat: 99999, lon: 99999, credits: 0 };

    responseBody = {
      sub: null,
      event: event,
      geoUrl: `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_PK}&format=json&q=${geoString}`,
      userSub: userSub,
      userAccountItems: userAccount.Items[0],
      LatLonResults: LatLonResults,
    };

    statusCode = 201;

    const response = {
      statusCode: statusCode,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*", // Required for CORS support to work
      },
      body: JSON.stringify(responseBody),
    };

    return response;
  }

  try {
    console.log(userAccount.Items[0].id, "rooooooo")
    const paramsUpdate = {
      TableName: "Accounts",
      Key: {
        id: userAccount.Items[0].id,
      },
      UpdateExpression: "set credits = credits - :creditValue",
      ExpressionAttributeValues: {
        ":creditValue": 1,
      },
      ReturnValues: "ALL_NEW",
    };
    console.log("Update DB - Start", paramsUpdate)
    const data = await documentClient.update(paramsUpdate).promise();
    console.log("Update DB - End")
  } catch (err) {
    console.log(err)
    const paramsUpdate = {
      TableName: "Accounts",
      Key: {
        id: userAccount.Items,
      },
      UpdateExpression: "set credits = credits - :creditValue",
      ExpressionAttributeValues: {
        ":creditValue": 1,
      },
      ReturnValues: "ALL_NEW",
    };
    responseBody = {
      err: err,
      froo: "cannot remove credits",
      paramsUpdate: paramsUpdate,
    };
    statusCode = 403;
    const response = {
      statusCode: statusCode,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*", // Required for CORS support to work
      },
      body: JSON.stringify(responseBody),
    };

    return response;
  }

  responseBody = {
    sub: userSub,
    event: event,
    geoUrl: `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_PK}&format=json&q=${geoString}`,
    userSub: userSub,
    userAccountItems: userAccount.Items[0],
    LatLonResults: LatLonResults,
    deleteErr
  };

  const response = {
    statusCode: 201,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*", // Required for CORS support to work
    },
    body: JSON.stringify(responseBody),
  };
  return response;
};


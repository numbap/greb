const AWS = require("aws-sdk");
const stripe = require("stripe")(process.env.REACT_APP_STRIPE_SK_LIVE);



exports.handler = async (event) => {
  const documentClient = new AWS.DynamoDB.DocumentClient();
  var userSub = "dog";
  var newUser = null;
  var session = null;
  let userAccount;
  let return_url= process.env.REACT_APP_STRIPE_RETURN_URL

  console.log(JSON.stringify(event.requestContext), "event.requestContext")

  if (
    event.requestContext &&
    event.requestContext.identity.cognitoAuthenticationProvider
  ) {
    userSub = event.requestContext.identity.cognitoAuthenticationProvider.split(
      ":CognitoSignIn:"
    )[1];
  }

  console.log(userSub, "userSub")

  const paramsGet = {
    TableName: "Accounts",
    IndexName: "userId-index",
    KeyConditionExpression: "userId = :sub",
    ExpressionAttributeValues: {
      ":sub": userSub,
    },
  };

  if (userSub) {
    userAccount = await documentClient.query(paramsGet).promise();

  }

  console.log(return_url, "return_url")
  console.log(event.headers.origin, "referring URL")
  console.log(JSON.stringify(userAccount), "userAccount")
  //       return_url: event.headers.origin,
  
  console.log("Redirectt")

  if (userAccount.Items && userAccount.Items[0].stripeClient) {
    session = await stripe.billingPortal.sessions.create({
      customer: userAccount.Items[0].stripeClient,
      return_url: return_url,
    });
  } else {
    newUser = "true";
  }

  // TODO implement
  const response = {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
      // "Access-Control-Allow-Headers":
      //   "Origin, X-Requested-With, Content-Type, Accept, Authorization",
      // "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
      "Access-Control-Allow-Origin": "*", // Required for CORS support to work
    },
    body: JSON.stringify({
      free: userSub,
      account: userAccount.Items[0].stripeClient,
      stripe: session ? session : {},
      newUser: newUser,
      userAccount: userAccount.Items[0] || null,
    }),
  };
  return response;
};

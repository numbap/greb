const AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-1" });

exports.handler = async (event) => {
    var docClient = new AWS.DynamoDB.DocumentClient();

    console.log("====================")
    // console.log(JSON.parse(event.body).seoString, "event")



    // 

    // JSON.parse(event.body).seoString

    let territory
    let locations
    var response
//            IndexName: "territoryId-id-index",


    console.log(JSON.parse(event.body).seoString, "SEOString")

    try{
        var tParams = {
            TableName: "Territory-eoswwj7vnjg7dgnuw3wuatle64-main",
            KeyConditionExpression: "urlString = :urlString",
            IndexName: "urlString-index",
            ExpressionAttributeValues: {
                ":urlString": JSON.parse(event.body).seoString
            },
        };

        console.log(JSON.parse(event.body).seoString, "SEOString")

        territory = await docClient.query(tParams).promise();
        console.log(territory, "territory")
 
        var lParams = {
            IndexName: "territoryId-id-index",
            TableName: "Location-eoswwj7vnjg7dgnuw3wuatle64-main",
            KeyConditionExpression: "territoryId = :territoryId",
            ExpressionAttributeValues: {
                ":territoryId": territory.Items[0].id
            },
        };

        console.log(territory, "territory")

        locations = await docClient.query(lParams).promise();
        // locations = await docClient.query(lParams).promise();
        let output = territory.Items[0]
        output.locations = { items: locations.Items }
        // output.locations = locations.Items
        console.log(output)

        response = {
            statusCode: 200,
            //  Uncomment below to enable CORS requests
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*"
            }, 
            body: JSON.stringify(output),
        };
    }catch(e){
        console.log(e)
        response = {
            statusCode: 403,
            //  Uncomment below to enable CORS requests
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*"
            }, 
            body: JSON.stringify("Invalid Code"),
        };
    }


    
    return response;
};


// "test-url-please-ignore"
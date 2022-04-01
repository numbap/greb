const AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-1" });

exports.handler = async (event) => {
    var docClient = new AWS.DynamoDB.DocumentClient();

    console.log(event.body, "event.body")
    // console.log(JSON.parse(event.body).seoString, "event")

    var tParams = {
        TableName: "Territory-eoswwj7vnjg7dgnuw3wuatle64-main",
        IndexName: "urlString-index"
    };

    //

    let territory
    let locations

    var response

    try{
        territory = await docClient.scan(tParams).promise()
        
        // query(tParams).promise();
        console.log(territory, "territory")

        response = {
            statusCode: 200,
            //  Uncomment below to enable CORS requests
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*"
            }, 
            body: JSON.stringify(territory),
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


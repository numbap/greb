"use strict";
const AWS = require("aws-sdk");
const { v4 } = require("uuid");
const { EventBridge } = require("aws-sdk");

exports.handler = async (event, context) => {
  const documentClient = new AWS.DynamoDB.DocumentClient();

  let responseBody = "";
  let statusCode = 0;

  const testBody = event ? event : "nothing";
  const userId = event.request.userAttributes.sub;

  try {
    const frooo = await v4();

    const params = {
      TableName: "Accounts",
      Item: {
        id: event.request.userAttributes.email,
        details: event,
        userName: event.userName,
        userEmail: event.request.userAttributes.email,
        userId: userId,
        accountLevel: "Free",
        credits: 100,
        price: 10.99,
        stripeClient: "",
        userId: event.request.userAttributes.sub,
      },
    };
    console.log("success. This message");
    const data = await await documentClient.put(params).promise();
    responseBody = "User successfully registered";
    statusCode = 201;
  } catch (err) {
    responseBody = err;
    statusCode = 403;
  }

  const response = {
    statusCode: statusCode,
    headers: {
      "Content-Type": "application/json",
    },
    body: responseBody,
  };

  // return response;
  context.done(null, event);
};


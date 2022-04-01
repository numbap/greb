"use strict";
const AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-1" });
//////////////////////////////////////////////////
//////////////////////////////////////////////////
// AWS.config.update({ region: "us-east-1" });
const docClient = new AWS.DynamoDB.DocumentClient();

const monthAdded = (date, months) => {
  let newDate;

  if (date) {
    newDate = new Date(date);
  } else {
    newDate = new Date();
  }

  newDate.setMonth(newDate.getMonth() + months);

  return newDate.getTime();
};

const callBack = (err, data) => {
  if (err) {
    console.log("err");
  } else {
    console.log("hit");
  }
};

// Refresh credits if below threshold.
let underParams = {
  TableName: "Accounts",
  Key: { id: "bb" },
  UpdateExpression: "set #t = :m1, #c = creditLevel",
  ConditionExpression: "#t < :t AND #c < creditLevel",
  ExpressionAttributeNames: {
    "#t": "lastUpdate",
    "#c": "credits",
  },
  ExpressionAttributeValues: {
    ":t": monthAdded(null, -1),
    ":m1": monthAdded(null, 0),
  },
};

// Update date if credits over threshold.
let overParams = {
  TableName: "Accounts",
  Key: { id: "bb" },
  UpdateExpression: "set #t = :m1",
  ConditionExpression: "#t < :t AND #c >= creditLevel",
  ExpressionAttributeNames: {
    "#t": "lastUpdate",
    "#c": "credits",
  },
  ExpressionAttributeValues: {
    ":t": monthAdded(null, -1),
    ":m1": monthAdded(null, 0),
  },
};

//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////

const updateAccount = async () => {
  const staleAccounts = await docClient
    .scan(
      {
        TableName: "Accounts",
        FilterExpression: "#lastUpdate < :uid AND #lastUpdate > :zero",
        ExpressionAttributeNames: {
          "#lastUpdate": "lastUpdate",
        },
        ExpressionAttributeValues: { ":uid": monthAdded(null, -1), ":zero": 0 },
        Limit: 100000,
      },
      callBack
    )
    .promise();
    

  console.log(staleAccounts);

  staleAccounts.Items.map(async (x) => {
    console.log("These are under");
    const tmpKey = { id: x.id };
    console.log("=========", { ...underParams, Key: tmpKey });
    try {
      console.log("These are Under");
      // Refresh credits if below threshold.
      await docClient
        .update({ ...underParams, Key: tmpKey }, callBack)
        .promise();
    } catch (e) {}
    try {
      console.log("These are Over");
      // Update date if credits over threshold.
      await docClient
        .update({ ...overParams, Key: tmpKey }, callBack)
        .promise();
    } catch (e) {}
  });
};

exports.handler = (event, context) => {
  updateAccount();
};

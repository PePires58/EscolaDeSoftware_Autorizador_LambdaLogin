const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });

exports.putTokenOnDatabase = async function (tokenItem) {
    const params = {
        TableName: process.env.TableName,
        Item: tokenItem,
        ReturnConsumedCapacity: "TOTAL",
        ConditionExpression: "attribute_not_exists(token)"
    };

    return await dynamodb.putItem(params)
        .promise()
        .then((data) => {
            return data;
        });
}
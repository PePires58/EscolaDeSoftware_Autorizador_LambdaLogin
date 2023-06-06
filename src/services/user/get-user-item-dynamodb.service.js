const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });

exports.getUserOnDataBase = async function (userEmail) {
    const params = {
        TableName: process.env.UsuariosTableName,
        ConsistentRead: false,
        Key: {
            "email": {
                S: userEmail
            }
        },
        AttributesToGet: [
            'email',
            'nome',
            'sobrenome',
            'senha'
        ]
    };

    return await dynamodb.getItem(params)
        .promise()
        .then((data) => {
            return data;
        });
}
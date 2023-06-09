const AWS = require('aws-sdk');
const ssm = new AWS.SSM({ apiVersion: '2014-11-06' });

exports.getTokenSecretService = async function () {
    const params = {
        Name: process.env.TokenSecretParameterName,
        WithDecryption: true
    };

    return await ssm.getParameter(params)
        .promise()
        .then((tokenSecret) => {
            return tokenSecret
        });
}
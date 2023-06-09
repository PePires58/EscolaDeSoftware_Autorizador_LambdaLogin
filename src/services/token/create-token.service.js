const jwt = require('jsonwebtoken');
const getTokenSecretService = require('./get-token-secret.service');

exports.createToken = async function (user) {

    const privateKey = await getTokenSecretService.getTokenSecretService();

    const token = jwt.sign(user, privateKey.Parameter.Value, {
        expiresIn: '3h',
        issuer: 'escoladesoftware',
        notBefore: '120ms',
        subject: user.email + '-escoladesoftware-user-token',
        audience: 'escoladesoftware',
    });

    return token;
}
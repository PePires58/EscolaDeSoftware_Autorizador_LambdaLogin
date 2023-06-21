const esAutorizadorPkg = require('escoladesoftware-autorizador-package');

exports.createToken = async function (user) {

    const privateKey = await esAutorizadorPkg
        .tokenSecret('process.env.TokenSecretParameterName', false);

    const token = esAutorizadorPkg.criaToken(user,
        privateKey.Parameter.Value,
        {
            expiresIn: '2 days',
            issuer: 'escoladesoftware',
            notBefore: '120ms',
            subject: user.email + '-escoladesoftware-user-token',
            audience: 'escoladesoftware'
        });

    return token;
}
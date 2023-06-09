const validateCredentialsObjectService = require('./services/user/validate-credentials-object.service');
const getUserItemDynamoDbService = require('./services/user/get-user-item-dynamodb.service');
const validateUserCredentialsService = require('./services/user/validate-user-credentials.service');
const createUserObjectService = require('./services/user/create-user-object.service');
const createTokenService = require('./services/token/create-token.service');
const createTokenPutItemService = require('./services/token/create-token-put-item.service');
const putTokenItemDynamoDbService = require('./services/token/put-token-item-dynamodb.service');

exports.lambdaHandler = async (event, context) => {

    const bodyJson = JSON.parse(event.body);

    const errors = validateCredentialsObjectService.validateCredentialsObject(bodyJson);
    if (errors.length > 0)
        return errorResult(400, errors);

    const userDbItem = await getUserItemDynamoDbService.getUserOnDataBase(bodyJson.email);

    if (!userDbItem.Item)
        return errorResult(400, { 'Mensagem': 'Usuário ou senha inválidos' });

    const userObject = createUserObjectService.createUserObject(userDbItem.Item);

    if (validateUserCredentialsService.validateUserCredentials(
        userObject, bodyJson
    )) {
        userObject.deletarSenha();

        try {
            const token = await createTokenService.createToken(userObject);
            const tokenPutItem = createTokenPutItemService.createTokenPutItem(token);

            await putTokenItemDynamoDbService.putTokenOnDatabase(tokenPutItem);

            return defaultResult(200, {
                token: token
            });
        } catch (error) {
            console.log(error);
            return errorResult(500, error);
        }
    }
    else
        return errorResult(400, { 'Mensagem': 'Usuário ou senha inválidos' });
}

function errorResult(statusCode, errors) {
    return defaultResult(statusCode, {
        errors: errors
    });
}

function defaultResult(statusCode, object) {
    return {
        'statusCode': statusCode,
        'body': JSON.stringify(object),
        'isBase64Encoded': false,
        'headers': {
            'Content-Type': 'application/json'
        }
    }
}
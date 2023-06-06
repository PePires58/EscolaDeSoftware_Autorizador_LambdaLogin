exports.validateUserCredentials = function (userObject, credentialsObject) {
    if (userObject.senha == credentialsObject.senha)
        return true;
    return false;
}
exports.validateCredentialsObject = function (user) {
    let errors = [];

    if (!user || Object.keys(user).length === 0) {
        errors.push('Objeto de usuário é obrigatório');
    }
    else {
        if (!user.email)
            errors.push('Email do usuário é obrigatório');
        if (!user.senha)
            errors.push('Senha do usuário é obrigatória');
    }

    return errors;
}
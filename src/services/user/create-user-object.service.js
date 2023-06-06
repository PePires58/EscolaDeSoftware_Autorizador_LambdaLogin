exports.createUserObject = function (userItem) {
    let userObject = {
        email: '',
        nome: '',
        sobrenome: '',
        senha: '',
        deletarSenha: function () {
            delete this.senha;
        }
    };

    if (userItem.email)
        userObject.email = userItem.email.S;
    if (userItem.nome)
        userObject.nome = userItem.nome.S;
    if (userItem.sobrenome)
        userObject.sobrenome = userItem.sobrenome.S;
    if (userItem.senha)
        userObject.senha = userItem.senha.S;

    return userObject;
}
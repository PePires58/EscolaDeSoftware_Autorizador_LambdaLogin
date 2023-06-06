exports.createUserObject = function (userItem) {
    return {
        email: userItem.email.S,
        nome: userItem.nome.S,
        sobrenome: userItem.sobrenome.S,
        senha: userItem.senha.S,
        deletarSenha: function () {
            delete this.senha;
        }
    };
}
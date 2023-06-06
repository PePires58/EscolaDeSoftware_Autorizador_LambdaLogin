/**
 * {
    nome: { S: 'joao' },
    email: { S: 'dagazcorretora1@hotmail.com' },
    senha: { S: 'pedrao123' },
    sobrenome: { S: 'maria' }
  }
 */

const assert = require('assert').strict;
const createUserObjectService = require('../services/user/create-user-object.service');

describe('Validate credentials object service tests', function () {
    it('Should create an object with all properties', function () {
        const userDbItem = {
            nome: { S: 'joao' },
            email: { S: 'dagazcorretora1@hotmail.com' },
            senha: { S: 'pedrao123' },
            sobrenome: { S: 'maria' }
        };

        const userObject = createUserObjectService.createUserObject(userDbItem);

        assert.equal(userObject.nome, userDbItem.nome.S);
        assert.equal(userObject.sobrenome, userDbItem.sobrenome.S);
        assert.equal(userObject.email, userDbItem.email.S);
        assert.equal(userObject.senha, userDbItem.senha.S);
    });
});
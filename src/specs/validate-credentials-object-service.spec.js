const assert = require('assert').strict;
const validateUserObjectService = require('../services/user/validate-credentials-object.service');

describe('Validate credentials object service tests', function () {
    it('Should have an error "Objeto de usuário é obrigatório"', function () {
        const errors = validateUserObjectService.validateCredentialsObject({});

        assert.ok(errors.length > 0);
        assert.ok(errors.find(c => c === "Objeto de usuário é obrigatório"));
    });

    it('Should have an error "Email do usuário é obrigatório"', function () {
        const userInput = {
            email: ''
        }

        const errors = validateUserObjectService.validateCredentialsObject(userInput);

        assert.ok(errors.length > 0);
        assert.ok(errors.find(c => c === "Email do usuário é obrigatório"));
    });

    it('Should have an error "Senha do usuário é obrigatória"', function () {
        const userInput = {
            email: 'pedrao@gmail.com',
            nome: 'pedrao',
            sobrenome: 'pires',
            cpf: '11122233311'
        }

        const errors = validateUserObjectService.validateCredentialsObject(userInput);

        assert.ok(errors.length > 0);
        assert.ok(errors.find(c => c === "Senha do usuário é obrigatória"));
    });

    it('Should not have errors', function () {
        const userInput = {
            email: 'pedrao@gmail.com',
            senha: 'suasenha'
        }

        const errors = validateUserObjectService.validateCredentialsObject(userInput);

        assert.equal(0, errors.length);
    });
});
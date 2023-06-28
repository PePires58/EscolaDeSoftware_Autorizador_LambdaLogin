import { CredenciaisValidacoes } from './../services/credenciais-validacoes';
import { expect } from 'chai';
import { describe, it } from 'mocha';
import { Credenciais } from '../models/credenciais';

describe('Testes para validação do objeto de credenciais', function () {

    it('Não deve conter erros', function () {
        const credenciais: Credenciais = new Credenciais();
        credenciais.email = 'pedrao@gmail.com';
        credenciais.senha = 'minhaSenha';

        const result = new CredenciaisValidacoes().ValidarObjeto(credenciais);

        expect(result.length).to.be.equal(0);
    });
});
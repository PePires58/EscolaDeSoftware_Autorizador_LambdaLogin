import { CredenciaisValidacoes } from '../../services/credenciais-validacoes';
import { expect, describe, it } from '@jest/globals';
import { Credenciais } from '../../models/credenciais';

describe('Testes para validação do objeto de credenciais', function () {

    it('Não deve conter erros', function () {
        const credenciais: Credenciais = {
            email: 'pedrao@gmail.com',
            senha: 'minhaSenha'
        };

        const result = new CredenciaisValidacoes().ValidarObjeto(credenciais);

        expect(result.length).toEqual(0);
    });
});
import { Usuario } from './../models/usuario';
import { CriarToken } from './../services/criar-token';
import { describe } from 'mocha';
import { expect } from 'chai';

describe('Criar token tests', function () {
    it('Deve criar um token com sucesso', function () {
        const usuario: Usuario = new Usuario();
        usuario.nome = 'pedro';
        usuario.sobrenome = 'pires';
        usuario.email = 'pedrao@gmail.com';

        const token = new CriarToken().CriarToken(usuario);

        expect(token).not.empty;
    });
});
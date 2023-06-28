import { CriarToken } from '../services/criar-token';
import { describe, it } from 'mocha';
import { expect } from 'chai';
import { Usuario } from 'escoladesoftware-autorizador-package-ts/lib/models/usuario';

describe('Criar token tests', function () {
    it('Deve criar um token com sucesso', async function () {
        const usuario: Usuario = {
            nome: 'pedro',
            sobrenome: 'pires',
            email: 'pedrao@gmail.com',
            cpf: '11111111111'
        };


        const minhaChave = 'minhaChave';

        const token = await new CriarToken().CriarToken(usuario, minhaChave);

        expect(token).not.empty;
    });
});
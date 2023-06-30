import { UsuarioEs } from './../../models/usuario-es';
import { CriaToken } from 'escoladesoftware-autorizador-package-ts/lib';
import { expect, describe, it } from '@jest/globals';
import { Usuario } from 'escoladesoftware-autorizador-package-ts/lib/models/usuario';

describe('Testes de criação do token', () => {
    it('Deve criar um token', () => {
        const chaveToken = 'minhaChave';
        const usuario: UsuarioEs = {
            nome: 'pedro',
            sobrenome: 'pires',
            email: 'pedrao@gmail.com',
            cpf: '11111111111',
            senha: ''
        };

        const token = new CriaToken().CriarToken(usuario as Usuario,
            chaveToken,
            {
                expiresIn: '2 days',
                issuer: 'pedrao',
                notBefore: '120ms',
                audience: 'pedrao',
                subject: 'pedrao@gmail.com-pedrao'
            });

        expect(token).not.toEqual('');
    });

    it('Deve criar um token sem passar alguns parametros', () => {
        const chaveToken = 'minhaChave';
        const usuario: UsuarioEs = {
            nome: 'pedro',
            sobrenome: 'pires',
            email: 'pedrao@gmail.com',
            cpf: '11111111111',
            senha: ''
        };

        const token = new CriaToken().CriarToken(usuario as Usuario,
            chaveToken,
            {
                issuer: 'pedrao',
                audience: 'pedrao',
                subject: 'pedrao@gmail.com-pedrao'
            });

        expect(token).not.toEqual('');
    });
});

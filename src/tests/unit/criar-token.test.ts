import { CriaToken } from '../../services/cria-token';
import { expect, describe, it } from '@jest/globals';
import { Usuario } from '../../models/usuario';

describe('Testes de criação do token', () => {
    it('Deve criar um token', () => {
        const chaveToken = 'minhaChave';
        const usuario: Usuario = {
            nome: 'pedro',
            sobrenome: 'pires',
            email: 'pedrao@gmail.com',
            cpf: '11111111111'
        };

        const token = new CriaToken().CriarToken(usuario,
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
        const usuario: Usuario = {
            nome: 'pedro',
            sobrenome: 'pires',
            email: 'pedrao@gmail.com',
            cpf: '11111111111'
        };

        const token = new CriaToken().CriarToken(usuario,
            chaveToken,
            {
                issuer: 'pedrao',
                audience: 'pedrao',
                subject: 'pedrao@gmail.com-pedrao'
            });

        expect(token).not.toEqual('');
    });
});

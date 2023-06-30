import { DynamoDbService } from './services/dynamodb';
import { CredenciaisValidacoes } from './services/credenciais-validacoes';
import { CriaToken } from './services/cria-token';
import { BuscaSegredoParameterStore } from './services/busca-segredo-parameter-store';

import { Credenciais } from './models/credenciais';
import { Erro } from './models/erro';
import { Usuario } from './models/usuario';

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda/trigger/api-gateway-proxy';

export const lambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    let erros: Erro[] = [];
    const credenciais: Credenciais = JSON.parse(event.body || '');

    erros = new CredenciaisValidacoes().ValidarObjeto(credenciais);
    if (erros.length > 0) return errorResult(400, erros);

    const dynamoDbService = new DynamoDbService();

    try {
        const usuario = await dynamoDbService.ConsultaUsuario(credenciais);
        const senhaEhValida = credenciais.senha === usuario.senha || '';
        if (senhaEhValida) {
            usuario.senha = '';

            const privateKey = await new BuscaSegredoParameterStore().BuscarSegredo(
                process.env.TokenSecretParameterName || '',
                false,
            );

            const token = new CriaToken().CriarToken(usuario as Usuario, privateKey, {
                expiresIn: '2 days',
                issuer: 'escoladesoftware',
                notBefore: '120ms',
                subject: usuario.email + '-escoladesoftware-user-token',
                audience: 'escoladesoftware',
            });

            const tokenObject = await dynamoDbService.AdicionarToken(token);

            return defaultResult(200, {
                token: tokenObject.token,
                expiresIn: tokenObject.expiresIn,
            });
        }

        erros.push(new Erro('Usuário ou senha inválidos'));
        return errorResult(400, erros);
    } catch (error) {
        console.log(error);
        throw error;
    }
};

function errorResult(statusCode: number, erros: Erro[]) {
    return defaultResult(statusCode, {
        erros: erros,
    });
}

function defaultResult(statusCode: number, object: object) {
    return {
        statusCode: statusCode,
        body: JSON.stringify(object),
        isBase64Encoded: false,
        headers: {
            'Content-Type': 'application/json',
        },
    };
}

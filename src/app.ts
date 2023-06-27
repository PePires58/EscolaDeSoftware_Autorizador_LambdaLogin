import { CriarToken } from './services/criar-token';
import { DynamoDbService } from './services/dynamodb';
import { CredenciaisValidacoes } from './services/credenciais-validacoes';
import { Credenciais } from './models/credenciais';

import { Erro } from './models/erro';

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda/trigger/api-gateway-proxy';

export const lambdaHandler = async (
    event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {

    let erros: Erro[] = [];
    const credenciais: Credenciais = JSON.parse(event.body || '');

    erros = new CredenciaisValidacoes().ValidarObjeto(credenciais);
    if (erros.length > 0)
        return errorResult(400, erros);

    const dynamoDbService = new DynamoDbService();

    const usuario = await dynamoDbService.ConsultaUsuario(credenciais);
    if (credenciais.SenhaEhValida(usuario.senha || '')) {
        usuario.DeletarSenha();

        const token = await new CriarToken().CriarToken(usuario);

        const tokenObject = await dynamoDbService.AdicionarToken(token);

        return defaultResult(200, {
            token: tokenObject.token,
            expiresIn: tokenObject.expiresIn
        });
    }

    erros.push(new Erro('Usuário ou senha inválidos'));
    return errorResult(400, erros);

}

function errorResult(statusCode: number, erros: Erro[]) {
    return defaultResult(statusCode, {
        erros: erros
    });
}

function defaultResult(statusCode: number, object: object) {
    return {
        'statusCode': statusCode,
        'body': JSON.stringify(object),
        'isBase64Encoded': false,
        'headers': {
            'Content-Type': 'application/json'
        }
    }
}
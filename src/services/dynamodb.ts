import {
    AttributeValue, DynamoDBClient,
    GetItemCommand, GetItemCommandInput, GetItemCommandOutput,
    PutItemCommand, PutItemCommandInput
} from "@aws-sdk/client-dynamodb";

import { TokenEs } from './../models/token-es';
import { UsuarioEs } from '../models/usuario-es';
import { Credenciais } from '../models/credenciais';

export class DynamoDbService {

    constructor() {
        this.client = new DynamoDBClient({ apiVersion: '2012-08-10' });
    }

    private client: DynamoDBClient;

    async ConsultaUsuario(credenciais: Credenciais): Promise<UsuarioEs> {

        const input: GetItemCommandInput = {
            TableName: process.env.UsuariosTableName || '',
            ConsistentRead: false,
            Key: {
                "email": {
                    S: credenciais.email
                }
            },
            AttributesToGet: [
                'email',
                'nome',
                'sobrenome',
                'senha'
            ]
        };

        const command: GetItemCommand = new GetItemCommand(input);

        return this.CriarObjetoUsuario(await this.client.send(command));
    }

    async AdicionarToken(token: string): Promise<TokenEs> {

        const itemToken = this.CriarObjetoToken(token);

        const input: PutItemCommandInput = {
            TableName: process.env.TokenTableName,
            Item: this.CriarObjetoToken(token),
            ReturnConsumedCapacity: "TOTAL",
            ConditionExpression: "attribute_not_exists(jwt_token)"
        };

        const command: PutItemCommand = new PutItemCommand(input);

        await this.client.send(command);

        return {
            token: token,
            expiresIn: itemToken.expiration_time.N || ''
        };
    }

    private CriarObjetoToken(token: string): Record<string, AttributeValue> {
        return {
            "jwt_token": {
                S: token
            },
            "expiration_time": {
                N: (Math.floor(Date.now() / 1000) + ((60 * 60) * 48)).toString()
            }
        };
    }

    private CriarObjetoUsuario(output: GetItemCommandOutput): UsuarioEs {
        if (output.Item) {
            const usuarioItem = output.Item;

            const usuario: UsuarioEs = {
                email: usuarioItem.email.S || '',
                nome: usuarioItem.nome.S || '',
                sobrenome: usuarioItem.sobrenome.S || '',
                senha: usuarioItem.senha.S || '',
                cpf: ''
            };

            return usuario;
        }
        return {
            email: '',
            nome: '',
            sobrenome: '',
            senha: '',
            cpf: ''
        };
    }
}
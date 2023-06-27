import { Usuario } from './../models/usuario';
import esAutorizadorPkg from 'escoladesoftware-autorizador-package';

export class CriarToken {

    async CriarToken(usuario: Usuario): Promise<string> {

        const privateKey = await esAutorizadorPkg
            .tokenSecret(process.env.TokenSecretParameterName || '', false);

        const token = esAutorizadorPkg.criaToken(usuario,
            privateKey.Parameter.Value,
            {
                expiresIn: '2 days',
                issuer: 'escoladesoftware',
                notBefore: '120ms',
                subject: usuario.email + '-escoladesoftware-user-token',
                audience: 'escoladesoftware'
            });

        return token;
    }
}
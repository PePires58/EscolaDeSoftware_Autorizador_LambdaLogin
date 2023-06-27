import { Usuario } from './../models/usuario';
import { CriaToken } from 'escoladesoftware-autorizador-package-ts'
import { BuscaSegredoParameterStore } from 'escoladesoftware-autorizador-package-ts'

export class CriarToken {

    async CriarToken(usuario: Usuario): Promise<string> {

        const privateKey = await new BuscaSegredoParameterStore()
            .BuscarSegredo(process.env.TokenSecretParameterName || '', false);

        const token = CriaToken.CriarToken(usuario,
            privateKey,
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
import { CriaToken } from 'escoladesoftware-autorizador-package-ts';
import { Usuario } from 'escoladesoftware-autorizador-package-ts/lib/models/usuario';

export class CriarToken {

    async CriarToken(usuario: Usuario, privateKey: string): Promise<string> {

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
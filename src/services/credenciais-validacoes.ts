import { Erro } from './../models/erro';
import { Credenciais } from './../models/credenciais';

import { ValidaEmail } from './valida-email';

export class CredenciaisValidacoes {

    ValidarObjeto(credenciais: Credenciais): Erro[] {
        const erros: Erro[] = [];


        const emailTrim = credenciais.email.trim()
        if (!credenciais.email)
            erros.push(new Erro('Email do usuário é obrigatório'));
        else if (!new ValidaEmail().EmailEhValido(credenciais.email))
            erros.push(new Erro('Email é inválido'));

            const senhaTrim = credenciais.senha.trim();
        if (!credenciais.senha)
            erros.push(new Erro('Senha do usuário é obrigatória'));
        else if (senhaTrim.length < 4)
                erros.push(new Erro('Senha dever ter no minimo 4 caracteres'));
        else if (senhaTrim.length > 255)
                erros.push(new Erro('Senha não deve ter mais que 255 caracteres'));

        return erros;
    }
}
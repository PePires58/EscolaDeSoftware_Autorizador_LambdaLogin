import { Erro } from './../models/erro';
import { Credenciais } from './../models/credenciais';

import { ValidaEmail } from './valida-email';

export class CredenciaisValidacoes {

    ValidarObjeto(credenciais: Credenciais): Erro[] {
        const erros: Erro[] = [];

        if (!credenciais.email)
            erros.push(new Erro('Email do usuário é obrigatório'));
        else if (!new ValidaEmail().EmailEhValido(credenciais.email))
            erros.push(new Erro('Email é inválido'));
        if (!credenciais.senha)
            erros.push(new Erro('Senha do usuário é obrigatória'));

        return erros;
    }
}
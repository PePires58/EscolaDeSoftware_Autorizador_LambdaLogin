export class Credenciais {

    constructor() {
        this.email = this.senha = '';
    }

    email: string;
    senha: string;

    SenhaEhValida(senha: string): boolean {
        return this.senha === senha;
    }
}
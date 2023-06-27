export class Usuario {

    constructor() {
        this.email = '';
        this.nome = '';
        this.senha = '';
        this.sobrenome = '';
        this.cpf = '';
    }

    email: string;
    nome: string;
    sobrenome: string;
    cpf: string;
    senha: string | undefined;

    DeletarSenha(): void {
        delete this.senha;
    }
}
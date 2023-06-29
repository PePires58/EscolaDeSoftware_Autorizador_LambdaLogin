import { SSMClient, GetParameterCommand, GetParameterCommandInput } from "@aws-sdk/client-ssm";

export class BuscaSegredoParameterStore {

    client: SSMClient;

    constructor() {
        this.client = new SSMClient({ apiVersion: '2014-11-06' })
    }

    async BuscarSegredo(caminhoSegredo: string, descriptografar: boolean = false) {
        const input: GetParameterCommandInput = {
            Name: caminhoSegredo,
            WithDecryption: descriptografar
        };

        const command: GetParameterCommand = new GetParameterCommand(input);

        let segredo = '';
        await this.client.send(command)
            .then((output) => {
                if (output.Parameter?.Value)
                    segredo = output.Parameter.Value;
            });

        return segredo;
    }
}
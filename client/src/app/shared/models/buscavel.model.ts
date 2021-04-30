import { TipoBusca } from './../enum/tipo-busca.enum';

export class Buscavel {
    descricao: string;
    tipoBusca: TipoBusca;
    siglaEstado: string;

    constructor(descricao?, tipoBusca?, siglaEstado?) {
        this.descricao = descricao;
        this.tipoBusca = tipoBusca;
        this.siglaEstado = siglaEstado;
    }
}

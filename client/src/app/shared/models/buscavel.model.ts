import { TipoBusca } from './../enum/tipo-busca.enum';

export class Buscavel {
    descricao: string;
    tipoBusca: TipoBusca;
    constructor(descricao?, tipoBusca?) {
        this.descricao = descricao;
        this.tipoBusca = tipoBusca;
    }
}

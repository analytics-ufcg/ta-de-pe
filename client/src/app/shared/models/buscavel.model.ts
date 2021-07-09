import { TipoBusca } from './../enum/tipo-busca.enum';

export class Buscavel {
    descricao: string;
    tipoBusca: TipoBusca;
    siglaEstado: string;
    slugMunicipio: string;

    constructor(descricao?, tipoBusca?, siglaEstado?, slugMunicipio?) {
        this.descricao = descricao;
        this.tipoBusca = tipoBusca;
        this.siglaEstado = siglaEstado;
        this.slugMunicipio = slugMunicipio;
    }
}

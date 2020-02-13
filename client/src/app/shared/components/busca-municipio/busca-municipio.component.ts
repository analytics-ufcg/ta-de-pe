import { Component } from '@angular/core';

import { MunicipioService } from '../../services/municipio.service';

@Component({
    selector: 'app-busca-municipio',
    templateUrl: './busca-municipio.component.html',
    styleUrls: ['./busca-municipio.component.scss']
})

export class BuscaMunicipioComponent {

    public placeholder = 'Escolha um município';
    public keyword = 'name';

    public municipios: any[];

    constructor(
        private buscaMunicipioService: MunicipioService) {
        this.municipios = [];
    }

    ngOnInit() {
        this.getMunicipios();
    }

    submitTemplateForm(value) {
        console.log(value);
    }

    getMunicipios() {
        this.buscaMunicipioService.getMunicipios().subscribe(municipios => {
            this.municipios = municipios.map(e => e.nome_municipio).sort();
        })
    }
}

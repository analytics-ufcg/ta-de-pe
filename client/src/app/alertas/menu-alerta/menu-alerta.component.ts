import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { TipoAlerta } from './../../shared/models/tipoAlerta.model';
import { AlertaService } from './../../shared/services/alerta.service';
import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-menu-alerta',
  templateUrl: './menu-alerta.component.html',
  styleUrls: ['./menu-alerta.component.scss']
})
export class MenuAlertaComponent implements OnInit, OnDestroy {

  @Output() alertaFilterChange = new EventEmitter<any>();

  private unsubscribe = new Subject();

  alertasDisponiveis;

  constructor(private alertaService: AlertaService) { }

  ngOnInit() {
    this.getTiposAlertas();
  }

  getTiposAlertas() {
    this.alertaService
      .getTiposAlertas()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(tiposAlertas => {
        const key = 'id_tipo';
        const tiposAlerta = [...new Map(tiposAlertas.map(item =>
          [item[key], item])).values()].map((alerta: TipoAlerta) => {
            return ({ idAlerta: alerta.id_tipo, descricaoAlerta: alerta.titulo, selected: true });
          });

        this.alertasDisponiveis = tiposAlerta;
      });
  }

  getStyle(idAlerta) {
    if (1 === idAlerta) {
      return { 'cor-borda-inferior-abertura-empresa': true };
    } else if (2 === idAlerta) {
      return { 'cor-borda-inferior-item-atipico': true };
    } else if (3 === idAlerta) {
      return { 'cor-borda-inferior-inidoneo': true };
    } else if (4 === idAlerta) {
      return { 'cor-borda-inferior-contratos-grandes': true };
    }
  }

  getCheckboxStyle(idAlerta) {
    if (1 === idAlerta) {
      return { 'cor-alerta-abertura-empresa': true };
    } else if (2 === idAlerta) {
      return { 'cor-alerta-item-atipico': true };
    } else if (3 === idAlerta) {
      return { 'cor-alerta-inidoneo': true };
    } else if (4 === idAlerta) {
      return { 'cor-alerta-contratos-grandes': true };
    }
  }

  changeTipoAlerta(val: boolean, index: number) {
    this.alertasDisponiveis[index].selected = !this.alertasDisponiveis[index].selected;
    const alertas = { alertasSelecionados: [] };
    this.alertasDisponiveis.forEach(alerta => {
      if (alerta.selected) {
        alertas.alertasSelecionados.push(alerta.idAlerta);
      }
    });
    this.alertaFilterChange.emit(alertas);
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}

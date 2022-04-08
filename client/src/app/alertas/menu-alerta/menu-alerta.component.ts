import { takeUntil, take } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { TipoAlerta } from './../../shared/models/tipoAlerta.model';
import { AlertaService } from './../../shared/services/alerta.service';
import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-menu-alerta',
  templateUrl: './menu-alerta.component.html',
  styleUrls: ['./menu-alerta.component.scss']
})
export class MenuAlertaComponent implements OnInit, OnDestroy {

  @Output() alertaFilterChange = new EventEmitter<any>();

  private unsubscribe = new Subject();

  alertasDisponiveis;

  constructor(
    private alertaService: AlertaService,
    private activatedRoute: ActivatedRoute) { }

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
            return ({
              idAlerta: alerta.id_tipo,
              tituloAlerta: alerta.titulo,
              descricaoAlerta: alerta.descricao,
              selected: true });
          });
        this.alertasDisponiveis = tiposAlerta;
        this.updateFiltroViaURL();
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

  updateFiltroViaURL() {
    this.activatedRoute.queryParams
      .pipe(take(1))
      .subscribe(params => {
        const alertas = params.alertas;

        if (alertas && alertas !== null) {
          const alertasParsed = alertas.split(',').map(a => Number(a));

          this.alertasDisponiveis.forEach(alerta => {
            alerta.selected = alertasParsed.includes(alerta.idAlerta);
          });
          this.alertaFilterChange.emit( { alertasSelecionados: alertasParsed });
        }
      });
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}

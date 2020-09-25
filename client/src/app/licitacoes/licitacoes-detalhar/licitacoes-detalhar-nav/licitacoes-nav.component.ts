import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-licitacoes-detalhar-nav',
  templateUrl: './licitacoes-detalhar-nav.component.html',
  styleUrls: ['./licitacoes-detalhar-nav.component.scss']
})
export class LicitacoesDetalharNavComponent implements OnInit {

  @Input() temContrato = false;

  constructor() { }

  ngOnInit() {
  }

}

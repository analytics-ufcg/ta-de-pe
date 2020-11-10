import { Component, Input, OnInit } from '@angular/core';

import { Alerta } from 'src/app/shared/models/alerta.model';

@Component({
  selector: 'app-card-alerta',
  templateUrl: './card-alerta.component.html',
  styleUrls: ['./card-alerta.component.scss']
})
export class CardAlertaComponent implements OnInit {

  @Input() alerta: Alerta;

  constructor() { }

  ngOnInit() {
  }

}

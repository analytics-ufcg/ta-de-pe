import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-alerta',
  templateUrl: './card-alerta.component.html',
  styleUrls: ['./card-alerta.component.scss']
})
export class CardAlertaComponent implements OnInit {

  @Input() alerta: string;

  constructor() { }

  ngOnInit() {
  }

}

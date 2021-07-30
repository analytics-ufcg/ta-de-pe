import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-alerta-inidoneos',
  templateUrl: './alerta-inidoneos.component.html',
  styleUrls: ['./alerta-inidoneos.component.scss']
})
export class AlertaInidoneosComponent implements OnInit {

  @Input() alerta;

  constructor() { }

  ngOnInit() {
  }

}

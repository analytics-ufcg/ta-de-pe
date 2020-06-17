import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tooltip-ajuda',
  templateUrl: './tooltip-ajuda.component.html',
  styleUrls: ['./tooltip-ajuda.component.scss']
})
export class TooltipAjudaComponent implements OnInit {

  @Input() descricao: string;
  @Input() posicao = 'top';

  constructor() { }

  ngOnInit() {
  }

}

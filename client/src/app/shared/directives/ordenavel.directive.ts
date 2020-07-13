import { Directive, Input, Output, EventEmitter } from '@angular/core';
import { DirecaoOrd, EventoOrd } from '../models/lista.model';

const trocar: {[key: string]: DirecaoOrd} = { 'asc': 'desc', 'desc': '', '': 'asc' };

@Directive({
  selector: 'th[ordenavel]',
  host: {
    '[class.asc]': 'direcao === "asc"',
    '[class.desc]': 'direcao === "desc"',
    '(click)': 'trocar()'
  }
})
export class OrdenavelDirective {

  constructor() { }

  @Input() ordenavel: string;
  @Input() direcao: DirecaoOrd = '';
  @Output() ordenar = new EventEmitter<EventoOrd>();

  trocar() {
    this.direcao = trocar[this.direcao];
    this.ordenar.emit({coluna: this.ordenavel, direcao: this.direcao});
  }
}

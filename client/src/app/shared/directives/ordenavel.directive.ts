import { Directive, Input, Output, EventEmitter, HostBinding, HostListener, Host } from '@angular/core';
import { DirecaoOrd, EventoOrd } from '../models/lista.model';

const trocar: {[key: string]: DirecaoOrd} = { asc: 'desc', desc: '', '': 'asc' };

@Directive({
  selector: 'th[appOrdenavel]'
})
export class OrdenavelDirective {

  constructor() { }

  @Input() ordenavel: string;
  @Input() direcao: DirecaoOrd = '';
  @Output() ordenar = new EventEmitter<EventoOrd>();

  @HostBinding('class.asc') ordAsc = false;
  @HostBinding('class.desc') ordDesc = false;

  @HostListener('click')
  trocar() {
    this.direcao = trocar[this.direcao];
    this.ordAsc = this.direcao === 'asc';
    this.ordDesc = this.direcao === 'desc';
    this.ordenar.emit({coluna: this.ordenavel, direcao: this.direcao});
  }
}

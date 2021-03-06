import { Directive, Input, Output, EventEmitter, HostBinding, HostListener, OnInit } from '@angular/core';
import { DirecaoOrd, EventoOrd } from '../models/lista.model';

const trocar: { [key: string]: DirecaoOrd } = { desc: 'asc', asc: '', '': 'desc' };

@Directive({
  selector: 'th[appOrdenavel]'
})
export class OrdenavelDirective implements OnInit {

  constructor() { }

  @Input() ordenavel: string;
  @Input() direcao: DirecaoOrd = '';
  @Output() ordenar = new EventEmitter<EventoOrd>();

  @HostBinding('class.asc') ordAsc = false;
  @HostBinding('class.desc') ordDesc = false;

  ngOnInit() {
    if (this.direcao) {
      this.ordAsc = this.direcao === 'asc';
      this.ordDesc = this.direcao === 'desc';
    }
  }

  @HostListener('click')
  trocar() {
    this.direcao = trocar[this.direcao];
    this.ordAsc = this.direcao === 'asc';
    this.ordDesc = this.direcao === 'desc';
    this.ordenar.emit({ coluna: this.ordenavel, direcao: this.direcao });
  }
}

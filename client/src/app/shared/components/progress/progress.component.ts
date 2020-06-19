import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss']
})
export class ProgressComponent implements OnInit, OnChanges {

  @Input() value: number;
  @Input() max: number;
  @Input() class: string;

  valor: number;

  constructor() {}

  ngOnInit() { }

  ngOnChanges() {
    if (this.value < 0) {
      this.value = 0;
    }
    if (this.max <= 0) {
      this.max = 0.1;
    }
    this.valor = this.value / this.max;
  }

  getClass(): string[] {
    const classes = ['progress-bar', this.class];

    return classes;
  }

}

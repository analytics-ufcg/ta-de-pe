import { Component, OnInit, Input } from '@angular/core';

import { Novidade } from 'src/app/shared/models/novidade.model';
import { NovidadeService } from 'src/app/shared/services/novidade.service';

@Component({
  selector: 'app-novidade',
  templateUrl: './novidade.component.html',
  styleUrls: ['./novidade.component.scss']
})
export class NovidadeComponent implements OnInit {

  @Input() novidade: Novidade;
  @Input() showMunicipio: boolean;

  constructor(public novidadeService: NovidadeService) { }

  ngOnInit() {
  }

}

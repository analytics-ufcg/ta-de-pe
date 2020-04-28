import { Component, Input } from '@angular/core';

import { NovidadeService } from 'src/app/shared/services/novidade.service';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent {

  @Input() timeline: any[];

  constructor(public novidadeService: NovidadeService) { }

}

import { Component, OnInit, LOCALE_ID, Inject } from '@angular/core';

@Component({
  selector: 'app-sobre',
  templateUrl: './sobre.component.html',
  styleUrls: ['./sobre.component.scss']
})
export class SobreComponent implements OnInit {

  public showDoacao = false;

  constructor(
    @Inject(LOCALE_ID) public locale: string) { }

  ngOnInit() {
    this.showDoacao = (this.locale === 'pt-CV');
  }

}

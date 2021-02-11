import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-busca',
  templateUrl: './busca.component.html',
  styleUrls: ['./busca.component.scss']
})
export class BuscaComponent implements OnInit {

  public termo = '';

  constructor(private activatedroute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedroute.queryParamMap.subscribe(params => {
      this.termo = params.get('termo');
    });
  }

}

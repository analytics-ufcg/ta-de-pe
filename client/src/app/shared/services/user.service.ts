import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private municipio = new BehaviorSubject<string>('');

  constructor() { }

  getMunicipioEscolhido(): Observable<string> {
    const municipioSalvo = this.getMunicipioLocalStorage();

    if (municipioSalvo && municipioSalvo !== null) {
      this.municipio.next(municipioSalvo);
    }

    return this.municipio.asObservable();
  }

  setMunicipioEscolhido(novosMunicipios: string) {
    const municipioSalvo = this.setMunicipioLocalStorage(novosMunicipios);
    this.municipio.next(municipioSalvo);
  }

  private getMunicipioLocalStorage(): string {
    return JSON.parse(localStorage.getItem('municipio'));
  }

  private setMunicipioLocalStorage(novoMunicipio): string {
    localStorage.setItem('municipio', JSON.stringify(novoMunicipio));
    return(novoMunicipio);
  }

}

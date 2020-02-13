import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private municipios = new BehaviorSubject<string[]>();

  constructor() { }

  getMunicipioEscolhido(): Observable<string[]> {
    return this.municipios.asObservable();
  }

  setMunicipioEscolhido(novosMunicipios: string[]) {
    const municipiosSalvos = this.setMunicipioLocalStorage(novosMunicipios);
    this.municipios.next(municipiosSalvos);
  }

  private getMunicipiosLocalStorage(): string {
    return JSON.parse(localStorage.getItem('municipioEscolhido'));
  }

  private setMunicipioLocalStorage(novoMunicipio): string {
    localStorage.setItem('municipioEscolhido', JSON.stringify(novoMunicipio));
    return(novoMunicipio);
  }

}

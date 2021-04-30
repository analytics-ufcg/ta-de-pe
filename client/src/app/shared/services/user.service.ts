import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private municipio = new BehaviorSubject<string>('');
  private siglaEstado = new BehaviorSubject<string>('');

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

  getSiglaEstadoEscolhido(): Observable<string> {
    const siglaEstadoSalvo = this.getSiglaEstadoLocalStorage();

    if (siglaEstadoSalvo && siglaEstadoSalvo !== null) {
      this.siglaEstado.next(siglaEstadoSalvo);
    }

    return this.siglaEstado.asObservable();
  }

  setSiglaEstadoEscolhido(novaSiglaEstado: string) {
    const siglaEstadoSalvo = this.setSiglaEstadoLocalStorage(novaSiglaEstado);
    this.siglaEstado.next(siglaEstadoSalvo);
  }

  private getSiglaEstadoLocalStorage(): string {
    return JSON.parse(localStorage.getItem('siglaEstado'));
  }

  private setSiglaEstadoLocalStorage(novaSiglaEstado): string {
    localStorage.setItem('siglaEstado', JSON.stringify(novaSiglaEstado));
    return(novaSiglaEstado);
  }

}

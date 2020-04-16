import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private loading: boolean;

  constructor() { }

  get isLoading(): boolean {
    return this.loading;
  }

  set isLoading(value: boolean) {
    this.loading = value;
  }

}

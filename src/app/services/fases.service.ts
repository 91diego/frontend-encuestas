import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FasesService {

  constructor(private httpClient: HttpClient) { }

  obtenerfases() {

    return this.httpClient.get(environment.url_api + 'fases');
  }
}

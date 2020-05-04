import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EncuestasService {

  constructor(private httpClient: HttpClient) { }

  obtenerEncuestas() {

    return this.httpClient.get(environment.url_api + 'encuesta');
  }

  crearEncuesta(encuesta: any) {

    return this.httpClient.post(environment.url_api + 'encuesta', encuesta);
  }
}

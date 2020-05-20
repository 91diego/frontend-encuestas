import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EncuestasService {

  constructor(private httpClient: HttpClient) { }

  // LISTADO DE ENCUESTAS
  obtenerEncuestas() {

    return this.httpClient.get(environment.url_api + 'encuestas');
  }

  // DETALLE DE ENCUESTA
  detalleEncuesta(id: any) {

    return this.httpClient.get(environment.url_api + 'encuestas/' + id);
  }

  // CREAR ENCUESTA
  crearEncuesta(encuesta: any) {

    return this.httpClient.post(environment.url_api + 'encuesta', encuesta);
  }
}

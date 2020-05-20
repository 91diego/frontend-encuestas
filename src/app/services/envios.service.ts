import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class EnviosService {

  constructor(private httpClient: HttpClient) { }

  obtenerEnvios() {

    return this.httpClient.get(environment.url_api + 'envios');
  }
}

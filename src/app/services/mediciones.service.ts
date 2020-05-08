import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MedicionesService {

  constructor(private httpClient: HttpClient) { }

  obtenerMediciones(id: any) {

    return this.httpClient.get(environment.url_api + 'mediciones/' + id);
  }
}

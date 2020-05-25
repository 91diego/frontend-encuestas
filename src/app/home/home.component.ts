import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material';

import { Envios } from '../interfaces/envios';
import { EnviosService } from './../services/envios.service';
import { empleado } from './../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  empleadoId;
  datos: Envios[];
  displayedColumns: string[] = ['nombre', 'desarrollo', 'estatus_envio', 'fecha_envio', 'numero_envios',
  'estatus_respuesta', 'fecha_respuesta'];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  dataSource = new MatTableDataSource<Envios>(this.datos);

  constructor(private activatedRoute: ActivatedRoute,
              private enviosService: EnviosService) { }

  ngOnInit() {
    
    empleado.empleadoId = this.activatedRoute.snapshot.params.empleado;
    this.empleadoId = empleado.empleadoId;
    console.log('ID Empleado desde el home component: ' + empleado.empleadoId);
    this.envios();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // MUESTRA EL LISTADO DE LAS ENCUESTAS ENVIADAS
  envios() {

    this.enviosService.obtenerEnvios()
    .subscribe((data: Envios[]) => {

      this.datos = data;
      console.log('Envios');
      console.log(this.datos);
      this.dataSource = new MatTableDataSource<Envios>(this.datos);
    });
  }
}
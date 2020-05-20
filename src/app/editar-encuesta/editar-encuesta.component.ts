import { Component, OnInit, ViewChild } from '@angular/core';

import { EncuestasService } from './../services/encuestas.service';

import { Encuestas } from '../interfaces/encuestas';
import { MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-editar-encuesta',
  templateUrl: './editar-encuesta.component.html',
  styleUrls: ['./editar-encuesta.component.scss']
})
export class EditarEncuestaComponent implements OnInit {

  encuesta: Encuestas[];

  displayedColumns: string[] = ['encuesta', 'desarrollo', 'fase'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  dataSource = new MatTableDataSource<Encuestas>(this.encuesta);

  constructor(private encuestasService: EncuestasService) {

    this.dataSource.paginator = this.paginator;
  }

  ngOnInit() {
    this.encuestas();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // MUESTRA EL LISTADO DE ENCUESTAS REGISTRADAS
  encuestas() {
    this.encuestasService.obtenerEncuestas()
    .subscribe((data: Encuestas[]) => {

      this.encuesta = data;
      console.log('Encuestas');
      console.log(this.encuesta);
      this.dataSource = new MatTableDataSource<Encuestas>(this.encuesta);
    });
  }

}

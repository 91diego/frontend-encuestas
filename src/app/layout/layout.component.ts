import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { empleado } from './../../environments/environment';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor(private activateRoute: ActivatedRoute) { 

    empleado.empleadoId =  this.activateRoute.snapshot.paramMap.get('empleado');
    console.log(empleado.empleadoId);
  }

  ngOnInit() {
  }

}

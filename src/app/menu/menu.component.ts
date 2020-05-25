import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { empleado } from './../../environments/environment';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  // ID DEL USUARIO DESDE LA URL
  @Input() empleadoId: any;
  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    this.empleadoId = empleado.empleadoId;
    console.log('ID Empleado desde el menú ' + this.empleadoId);
  }

}

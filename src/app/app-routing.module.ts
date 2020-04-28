import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrearEncuestaComponent } from './crear-encuesta/crear-encuesta.component';
import { EditarEncuestaComponent } from './editar-encuesta/editar-encuesta.component';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'crear-encuesta',
        component: CrearEncuestaComponent
      },
      {
        path: 'editar-encuesta',
        component: EditarEncuestaComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

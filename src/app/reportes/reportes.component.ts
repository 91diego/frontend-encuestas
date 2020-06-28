import { Component, OnInit } from "@angular/core";
import { Chart } from 'node_modules/chart.js';
import { ExportarService } from './../services/exportar.service';

@Component({
  selector: "app-reportes",
  templateUrl: "./reportes.component.html",
  styleUrls: ["./reportes.component.scss"],
})
export class ReportesComponent implements OnInit {


  dataSample: any = [{
    eid: 'e101',
    ename: 'ravi',
    esal: 1000
    },{
    eid: 'e102',
    ename: 'ram',
    esal: 2000
    },{
    eid: 'e103',
    ename: 'rajesh',
    esal: 3000
    }
  ];

  constructor(private exportarService: ExportarService) {}

  ngOnInit() {

    /*var canvas = <HTMLCanvasElement> document.getElementById("myChart");
    var ctx = canvas.getContext("2d");

    var ct = canvas.getContext("2d");
    var myChart = new Chart(ct, {
      type: "doughnut",
      data: {
        labels: ["Enviados", "Contestados", "Pendientes"],
        datasets: [
          {
            label: "# of Votes",
            data: [20, 17, 3],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)"
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)"
            ],
            borderWidth: 3,
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });*/
  }

  /**
   * Fecha: 2020.06.27
   * Nombre: DIEGO GONZALEZ
   * Descripcion: Funcion que realiza la peticion a la API
   * para obtener la informacion de las encuestas.
   * La funcion llama a exportAsExcekFile la cual es la encargada
   * de generar el archivo.
   */
  exportar() {
    
    this.exportarService.expotarExcel().subscribe(
      data => {

        this.exportarService.exportAsExcelFile(data, 'reporte_ecuestas');
      }
    )
    console.log('Export data');
  }
}

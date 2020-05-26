import { Component, OnInit } from "@angular/core";
import { Chart } from 'node_modules/chart.js';

@Component({
  selector: "app-reportes",
  templateUrl: "./reportes.component.html",
  styleUrls: ["./reportes.component.scss"],
})
export class ReportesComponent implements OnInit {
  constructor() {}

  ngOnInit() {

    var canvas = <HTMLCanvasElement> document.getElementById("myChart");
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
    });
  }
}

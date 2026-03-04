import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ApexOptions, NgApexchartsModule } from "ng-apexcharts";
import { ProductService } from '../../services/product-service';
import { ToastService } from '../../services/toast-service';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-home',
  imports: [ToastModule,ButtonModule,NgApexchartsModule, TableModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  user: any;
  products: any[] = [];
  public chartOptions!: Partial<ApexOptions>;
  public donutChartOptions!: Partial<ApexOptions>;
  public lineChartOptions!: Partial<ApexOptions>;
  public bubbleChartOptions!: Partial<ApexOptions>;
  constructor(private pService: ProductService, private toastMessage: ToastService) {
    this.loadBarChart();
    this.loadDonutChart();
    this.loadProducts();
    this.loadLineChart();
    this.loadBubbleChart();
  }

  ngOnInit(): void {
    const userString = localStorage.getItem("actualUser");
    this.user = JSON.parse(userString ?? '{ fullname: sin usuario }');
  }

  loadBarChart() {
    this.chartOptions = {
      series: [
        {
          name: "Last 6 days",
          data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43, 67]
        },
        {
          name: "Last Week",
          data: [13, 23, 20, 8, 13, 27, 13, 20, 10, 20, 13, 10]
        }
      ],
      chart: {
        type: "bar",
        height: 250,
        stacked: false,
        toolbar: { show: false }
      },
      colors: ["#5A67D8", "#E2E8F0"],
      plotOptions: {
        bar: {
          columnWidth: "35%",
          borderRadius: 4
        }
      },
      dataLabels: { enabled: false },
      grid: {
        borderColor: "#f1f1f1",
        xaxis: { lines: { show: false } },
        yaxis: { lines: { show: true } }
      },
      xaxis: {
        categories: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
        axisBorder: { show: false }
      },
      legend: {
        position: 'bottom',
        horizontalAlign: 'left'
      }
    };
  }

  loadDonutChart() {
    this.donutChartOptions = {
      series: [40, 32, 28], // Los porcentajes del Figma
      chart: {
        type: "donut",
        height: 280,
      },
      labels: ["Afternoon", "Evening", "Morning"],
      colors: ["#5A67D8", "#818CF8", "#C7D2FE"], // Degradado de azules/morados
      plotOptions: {
        pie: {
          donut: {
            size: '75%', // Grosor del anillo
            labels: {
                show: false // Ocultamos las etiquetas internas para usar la leyenda personalizada
            }
          }
        }
      },
      dataLabels: {
        enabled: false
      },
      legend: {
        show: false // La leyenda la hicimos manual en el HTML para mayor control
      }
    };
  }

  loadProducts() {
    this.pService.paginateProducts(1, 5).subscribe({
      next: (res) => {
        if (res.success) {
          this.products = res.data.items;
        } else {
          this.toastMessage.showError(res.message);
        }
      },
      error: (err) => {
        this.toastMessage.showError('Error loading products: ' + err.error.message);
      }
    });
  }

  loadLineChart() {
    this.lineChartOptions = {
      series: [
        {
          name: "Orders",
          data: [31, 40, 28, 51, 42, 109, 100] // Datos de ejemplo
        }
      ],
      chart: {
        height: 200,
        type: "area", // Usamos 'area' para darle ese sombreado suave debajo de la línea
        toolbar: { show: false },
        sparkline: { enabled: false } // Cambia a true si quieres que sea ultra minimalista
      },
      colors: ["#F59E0B"], // Color naranja/ámbar para contrastar con los azules
      dataLabels: { enabled: false },
      stroke: {
        curve: "smooth",
        width: 3
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.4,
          opacityTo: 0.1,
          stops: [0, 90, 100]
        }
      },
      xaxis: {
        categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        axisBorder: { show: false },
        axisTicks: { show: false }
      },
      yaxis: {
        show: false // Ocultamos el eje Y para que se vea más limpio como en el diseño
      },
      grid: {
        show: false // Quitamos las líneas de fondo
      }
    };
  }

  loadBubbleChart() {
    this.bubbleChartOptions = {
      series: [
        { name: "Hygiene", data: [[10, 50, 55]] },    // [x, y, tamaño]
        { name: "Packaging", data: [[15, 30, 102]] },  
        { name: "Food Taste", data: [[25, 45, 75]] }  
      ],
      chart: {
        type: "bubble",
        height: 250,
        toolbar: { show: false }
      },
      dataLabels: {
        enabled: true,
        formatter: (val: string) => val + "%", // Muestra el porcentaje dentro
        style: { colors: ["#fff"] }
      },
      fill: { opacity: 0.8 },
      colors: ["#818CF8", "#2DD4BF", "#FB923C"], // Los colores del Figma
      xaxis: { 
        min: 0, 
        max: 35,
        labels: { show: false }, 
        axisTicks: {show:false},
        axisBorder: { show: false } 
      },
      yaxis: { show: false, max: 70 },
      legend: { position: 'bottom' }
    };
  }
}

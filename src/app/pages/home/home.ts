import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ApexOptions, NgApexchartsModule } from "ng-apexcharts";
import { ProductService } from '../../services/product-service';
import { ToastService } from '../../services/toast-service';
import { TableModule } from 'primeng/table';
import { Dialog } from 'primeng/dialog';
import { Select, SelectModule } from 'primeng/select';
import { CommonModule } from '@angular/common';
import { StoreService } from '../../services/store-service';
import { FormsModule } from '@angular/forms';

interface Column {
    field: string;
    header: string;
}

@Component({
  selector: 'app-home',
  imports: [ToastModule,ButtonModule,NgApexchartsModule, TableModule, Dialog, Select, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  user: any;
  products: any[] = [];
  stores: any[] = [];
  dataDonutChart: any[] = [];
  dataLineChart: any[] = [];
  selectedStore: any;
  cols: any[] = [];
  dataTableDialog: any[] = [];
  reportType: string = "";
  visible: boolean = false;
  public chartOptions!: Partial<ApexOptions>;
  public donutChartOptions!: Partial<ApexOptions>;
  public lineChartOptions!: Partial<ApexOptions>;
  public bubbleChartOptions!: Partial<ApexOptions>;

  constructor(private pService: ProductService, private toastMessage: ToastService, private sService: StoreService) {
    this.loadBarChart();
    this.loadDonutChart();
    this.loadProducts();
    this.loadStores();
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
    this.pService.getProductsByCategory().subscribe({
      next: (res) => {
        if (res.success) {
          this.dataDonutChart = res.data;
          const labels = this.dataDonutChart.map((item: any) => item.category);
          const series = this.dataDonutChart.map((item: any) => item.productCount);
          this.donutChartOptions = {
            series: series,
            chart: {
              type: "donut",
              height: 280,
            },
            labels: labels,
            colors: ["#5A67D8", "#818CF8", "#dcc7fe", "#3fa0b8", "#66e1ea", "#c7fbfe", "#43c17e", "#68e49a", "#c7feda"],
            plotOptions: {
              pie: {
                donut: {
                  size: '75%',
                  labels: {
                      show: false
                  }
                }
              }
            },
            dataLabels: { enabled: false },
            legend: { position: 'bottom' }
          };
        } else {
          this.toastMessage.showError(res.message);
        }
      },
      error: (err) => {
        this.toastMessage.showError('Donut chart failed: ' + err);
      }
    })

    
  }

  loadProducts() {
    this.pService.getProductsWithMoreStock().subscribe({
      next: (res) => {
        if (res.success) {
          this.products = res.data;
        } else {
          this.toastMessage.showError(res.message);
        }
      },
      error: (err) => {
        this.toastMessage.showError('Error loading products: ' + err.error.message);
      }
    });
  }

  getNormalizedData() {
    const mesActual = new Date().getMonth() + 1;
    const mesesDelPeriodo = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    
    return mesesDelPeriodo.map(m => {
      const registro = this.dataLineChart.find((item: any) => item.month === m);
      return {
        monthName: this.getMonthNameByNumber(m),
        totalStock: registro ? registro.totalStock : 0
      };
    });
  }

  loadLineChart(storeId: number) {
    this.pService.getProductsByStockUpdateMonth(storeId).subscribe({
      next: (res) => {
        if (res.success) {
          const mesActual = new Date().getMonth() + 1; // 1-12
          const esPrimerSemestre = mesActual <= 6;
          
          const mesesDelPeriodo = esPrimerSemestre ? [1, 2, 3, 4, 5, 6] : [7, 8, 9, 10, 11, 12];

          this.dataLineChart = res.data;
          const seriesData = mesesDelPeriodo.map(numMes => {
            const registroEncontrado = this.dataLineChart.find((item: any) => item.month === numMes);
            return registroEncontrado ? registroEncontrado.totalStock : 0;
          });

          const labels = mesesDelPeriodo.map(m => this.getMonthNameByNumber(m));
          this.lineChartOptions = {
            series: [{ name: "Stock Movil", data: seriesData }],
            chart: { type: "area", height: 200, toolbar: { show: false } },
            colors: ["#F59E0B"], // Naranja Hiraoka
            stroke: { curve: "smooth", width: 3 },
            xaxis: { categories: labels },
            yaxis: { show: false },
            fill: {
              type: "gradient",
              gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.4,
                opacityTo: 0.1,
                stops: [0, 90, 100]
              }
            }
          };
        }
      }
    });
  }

  loadStores() {
    this.sService.getStores().subscribe(res => {
        if (res.success) {
          this.stores = res.data;
          this.selectedStore = this.stores[0];
          this.loadLineChart(Number(this.selectedStore.id));
        }
    });
  }

  onStoreChange(event: any) {
      // Cuando cambias la tienda, el gráfico se actualiza con datos reales
      this.loadLineChart(Number(event.value.id));
  }

  getMonthNameByNumber(month: number): string{
    switch(month){
      case 1: return "Jan";
      case 2: return "Feb";
      case 3: return "Mar";
      case 4: return "Apr";
      case 5: return "May";
      case 6: return "Jun";
      case 7: return "Jul";
      case 8: return "Aug";
      case 9: return "Sep";
      case 10: return "Oct";
      case 11: return "Nov";
      case 12: return "Dec";
    }
    return "Non"
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

  openReport(type: string) {
    //FAKE DATA
    this.reportType = type;

    if (type === "revenue"){
      this.cols = [
        { field: 'day', header: 'Day/Period' },
        { field: 'current', header: 'Current week (Last 6 days)' },
        { field: 'last', header: 'Last Week' },
        { field: 'diff', header: 'Difference' }
      ];

      const currentData = [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43, 67];
      const lastData = [13, 23, 20, 8, 13, 27, 13, 20, 10, 20, 13, 10];
      const categories = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];

      this.dataTableDialog = categories.map((cat, index) => {
        const current = currentData[index];
        const last = lastData[index];
        return {
          day: cat,
          current: current,
          last: last,
          diff: current - last
        };
      });

    } else if (type === "products per category" ) {
      this.cols = [
        { field: 'category', header: 'Category' },
        { field: 'productCount', header: "Product's quantity" }
      ];
      this.dataTableDialog = this.dataDonutChart;
    } else if (type === "stock per month and store") {
      this.cols = [
        { field: 'monthName', header: 'Mes' },
        { field: 'totalStock', header: 'Stock Total Actualizado' }
      ];
      this.dataTableDialog = this.getNormalizedData();
    }

    this.visible = true;
  }

  
}

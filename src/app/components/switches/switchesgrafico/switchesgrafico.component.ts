import { Component, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { CalendarModule } from 'primeng/calendar';
import { SwitchesService } from '../../../services/switches.service';
import { Switches } from '../../../model/switches';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { FormsModule } from '@angular/forms'; // Adicione esta linha

@Component({
  selector: 'app-switchesgrafico',
  standalone: true,
  imports: [ChartModule, ProgressSpinnerModule, CalendarModule, FormsModule],
  templateUrl: './switchesgrafico.component.html',
  styleUrls: ['./switchesgrafico.component.scss']
})
export class SwitchesgraficoComponent implements OnInit {

  mmodeloData: any;
  modeloOptions: any;

  marcaData: any;
  marcaOptions: any;

  hostnameData: any;
  hostnameOptions: any;

  imobilizadoData: any;
  imobilizadoOptions: any;


  isLoading = true;
  startDate!: Date;
  endDate!: Date;

  constructor(private switchesService: SwitchesService) { }

  ngOnInit() {
    this.loadData();
    this.loadHostname();
    this.loadModelo();
    this.loadImobilizado();
  }

  private loadData() {
    this.isLoading = true;
    this.switchesService.get('').subscribe(
      (data: Switches[]) => {
        const filteredData = this.filterByDate(data);
        
        const brandCountMap = filteredData.reduce((acc, item) => {
          acc[item.marca] = (acc[item.marca] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);

        const labels = Object.keys(brandCountMap);
        const quantities = Object.values(brandCountMap);

        this.marcaData = {
          labels: labels,
          datasets: [
            {
              label: 'Quantidades',
              data: quantities,
              backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)'],
              borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)'],
              borderWidth: 1
            }
          ]
        };

        this.marcaOptions = {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              labels: {
                color: 'black'
              }
            },
            tooltip: {
              callbacks: {
                label: function(tooltipItem: any) {
                  return `${tooltipItem.label}: ${tooltipItem.raw}`;
                }
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                color: 'black'
              },
              grid: {
                color: 'rgba(0, 0, 0, 0.1)',
                drawBorder: false
              }
            },
            x: {
              ticks: {
                color: 'black'
              },
              grid: {
                color: 'rgba(0, 0, 0, 0.1)',
                drawBorder: false
              }
            }
          }
        };

        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching switches', error);
        this.isLoading = false;
      }
    );
  }

  private loadModelo() {
    this.isLoading = true;
    this.switchesService.get('').subscribe(
      (data: Switches[]) => {
        const filteredData = this.filterByDate(data);
        
        // Limitar a 30 itens
        const limitedData = filteredData.slice(0, 30);
  
        const brandCountMap = limitedData.reduce((acc, item) => {
          acc[item.modelo] = (acc[item.modelo] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);
  
        const labels = Object.keys(brandCountMap);
        const quantities = Object.values(brandCountMap);
  
        this.mmodeloData = {
          labels: labels,
          datasets: [
            {
              label: 'Quantidades',
              data: quantities,
              backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)'],
              borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)'],
              borderWidth: 1
            }
          ]
        };
  
        this.modeloOptions = {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              labels: {
                color: 'black'
              }
            },
            tooltip: {
              callbacks: {
                label: function(tooltipItem: any) {
                  return `${tooltipItem.label}: ${tooltipItem.raw}`;
                }
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                color: 'black'
              },
              grid: {
                color: 'rgba(0, 0, 0, 0.1)',
                drawBorder: false
              }
            },
            x: {
              ticks: {
                color: 'black'
              },
              grid: {
                color: 'rgba(0, 0, 0, 0.1)',
                drawBorder: false
              }
            }
          }
        };
  
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching switches', error);
        this.isLoading = false;
      }
    );
  }
  

  private loadHostname() {
    this.isLoading = true;
    this.switchesService.get('').subscribe(
      (data: Switches[]) => {
        const filteredData = this.filterByDate(data);
        
        // Limitar a 30 itens
        const limitedData = filteredData.slice(0, 30);
  
        const hostnameCountMap = limitedData.reduce((acc, item) => {
          acc[item.hostname] = (acc[item.hostname] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);
  
        const labels = Object.keys(hostnameCountMap);
        const quantities = Object.values(hostnameCountMap);
  
        this.hostnameData = {
          labels: labels,
          datasets: [
            {
              label: 'Quantidades',
              data: quantities,
              backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)'],
              borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)'],
              borderWidth: 1
            }
          ]
        };
  
        this.hostnameOptions = {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              labels: {
                color: 'black'
              }
            },
            tooltip: {
              callbacks: {
                label: function(tooltipItem: any) {
                  return `${tooltipItem.label}: ${tooltipItem.raw}`;
                }
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                color: 'black'
              },
              grid: {
                color: 'rgba(0, 0, 0, 0.1)',
                drawBorder: false
              }
            },
            x: {
              ticks: {
                color: 'black'
              },
              grid: {
                color: 'rgba(0, 0, 0, 0.1)',
                drawBorder: false
              }
            }
          }
        };
  
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching switches', error);
        this.isLoading = false;
      }
    );
  }
  


  private loadImobilizado() {
    this.isLoading = true;
    this.switchesService.get('').subscribe(
      (data: Switches[]) => {
        const filteredData = this.filterByDate(data);
        
        // Limitar a 30 itens
        const limitedData = filteredData.slice(0, 30);
  
        const imobilizadoCountMap = limitedData.reduce((acc, item) => {
          acc[item.imobilizado] = (acc[item.imobilizado] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);
  
        const labels = Object.keys(imobilizadoCountMap);
        const quantities = Object.values(imobilizadoCountMap);
  
        this.imobilizadoData = {
          labels: labels,
          datasets: [
            {
              label: 'Quantidades',
              data: quantities,
              backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)'],
              borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)'],
              borderWidth: 1
            }
          ]
        };
  
        this.imobilizadoOptions = {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              labels: {
                color: 'black'
              }
            },
            tooltip: {
              callbacks: {
                label: function(tooltipItem: any) {
                  return `${tooltipItem.label}: ${tooltipItem.raw}`;
                }
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                color: 'black'
              },
              grid: {
                color: 'rgba(0, 0, 0, 0.1)',
                drawBorder: false
              }
            },
            x: {
              ticks: {
                color: 'black'
              },
              grid: {
                color: 'rgba(0, 0, 0, 0.1)',
                drawBorder: false
              }
            }
          }
        };
  
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching switches', error);
        this.isLoading = false;
      }
    );
  }
  




  
  private filterByDate(data: Switches[]): Switches[] {
    if (this.startDate && this.endDate) {
      return data.filter(item => {
        const itemDate = new Date(item.data);
        return itemDate >= this.startDate && itemDate <= this.endDate;
      });
    }
    return data;
  }

  onDateChange() {
    this.loadData();
    this.loadHostname();
  }
}

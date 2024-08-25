import { Component, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { SwitchesService } from '../../../services/switches.service';
import { Switches } from '../../../model/switches';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-switchesgrafico',
  standalone: true,
  imports: [ChartModule, ProgressSpinnerModule],
  templateUrl: './switchesgrafico.component.html',
  styleUrls: ['./switchesgrafico.component.scss']
})
export class SwitchesgraficoComponent implements OnInit {

  basicData: any;
  basicOptions: any;
  isLoading = true;

  constructor(private switchesService: SwitchesService) { }

  ngOnInit() {
    this.loadChartData();
  }

  private loadChartData() {
    this.isLoading = true;
    this.switchesService.get('').subscribe(
      (data: Switches[]) => {
        const brandCountMap = data.reduce((acc, item) => {
          acc[item.marca] = (acc[item.marca] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);
  
        const labels = Object.keys(brandCountMap);
        const quantities = Object.values(brandCountMap);
  
        this.basicData = {
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
  
        this.basicOptions = {
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
  
        this.isLoading = false; // Dados carregados com sucesso
      },
      (error) => {
        console.error('Error fetching switches', error);
        this.isLoading = false; // Erro ao carregar dados
      }
    );
  }
  


}

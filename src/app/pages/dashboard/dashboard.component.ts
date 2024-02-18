import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  chart: any;

  ngOnInit(): void {
    this.createChart();
    this.createChart2();
    this.createChart3();
  }

  createChart(): void {
    const canvas = document.getElementById('technicianChart') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
  
    // @ts-ignore
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Tecnico 1', 'Tecnico 2', 'Tecnico 3'], // Replace with actual technician names
        datasets: [{
          label: 'Number of Incidents', 
          data: [14,3,7], // Replace with actual number of incidents for each technician
          backgroundColor: [
            'rgba(255, 100, 147, 0.2)',
            'rgba(116, 92, 216, 0.2)',
            'rgba(253, 183, 63, 0.2)'
          ],
          borderColor: [
            'rgba(255, 100, 147, 1)',
            'rgba(116, 92, 216, 1)',
            'rgba(253, 183, 63, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  createChart2(): void {
    const canvas = document.getElementById('technicianChart2') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
  
    // @ts-ignore
    this.chart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Tecnico 1', 'Tecnico 2', 'Tecnico 3'], // Replace with actual technician names
        datasets: [{
          label: 'Number of Incidents', 
          data: [7, 2, 5], // Replace with actual number of incidents for each technician
          backgroundColor: [
            'rgba(255, 100, 147, 0.2)',
            'rgba(116, 92, 216, 0.2)',
            'rgba(253, 183, 63, 0.2)'
          ],
          borderColor: [
            'rgba(255, 100, 147, 1)',
            'rgba(116, 92, 216, 1)',
            'rgba(253, 183, 63, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }


  createChart3(): void {
    const canvas = document.getElementById('technicianChart3') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
  
    // @ts-ignore
    this.chart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Tecnico 1', 'Tecnico 2', 'Tecnico 3'], // Replace with actual technician names
        datasets: [{
          label: 'Number of Incidents', 
          data: [7, 2, 5], // Replace with actual number of incidents for each technician
          backgroundColor: [
            'rgba(255, 100, 147, 0.2)',
            'rgba(116, 92, 216, 0.2)',
            'rgba(253, 183, 63, 0.2)'
          ],
          borderColor: [
            'rgba(255, 100, 147, 1)',
            'rgba(116, 92, 216, 1)',
            'rgba(253, 183, 63, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
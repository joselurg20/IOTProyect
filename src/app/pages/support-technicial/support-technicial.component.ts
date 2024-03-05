import { AfterViewInit, Component, ComponentRef, OnInit } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ApiService } from 'src/app/services/api.sevice';
import { CommonModule } from '@angular/common';
import { iTicketTable } from 'src/app/model/iTicketTable';
import { Chart } from 'chart.js/auto';
import { iUserTable } from 'src/app/model/iUserTable';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-support-technicial',
  standalone: true,
  imports: [CommonModule, NavbarComponent, MatTableModule, MatSortModule, MatPaginatorModule],
  templateUrl: './support-technicial.component.html',
  styleUrls: ['./support-technicial.component.scss']
})
export class SupportTechnicialComponent implements AfterViewInit, OnInit {
  title = 'sidenav';
  chart: any;
  isSideNavCollapsed = false;
  screenWidth = 0;
  displayedColumns: string[] = ['id', 'title', 'name', 'email', 'priority', 'state', 'timestamp', 'userID'];
  dataSource = new MatTableDataSource<iTicketTable>();
  selectedRow: any;
  loggedUserName: string = "";

  constructor(private _liveAnnouncer: LiveAnnouncer, private apiService: ApiService, private loginService: LoginService,
    private router: Router) { }

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (data: iTicketTable, sortHeaderId: string) => {
      switch (sortHeaderId) {
        case 'priority':
          return this.getPriorityValue(data.priority);
        case 'timestamp':
          return new Date(data.timestamp).getTime(); // Convertir la fecha a milisegundos para ordenar correctamente
        default:
          const value = data[sortHeaderId as keyof iTicketTable]; // Obtener el valor de la propiedad
          return typeof value === 'string' ? value.toLowerCase() : (typeof value === 'number' ? value : 0); // Convertir a minúsculas si es una cadena o devolver el valor numérico
      }
    };
  }

  getPriorityValue(priority: string): number {
    switch (priority) {
      case 'HIGHEST': return 1;
      case 'HIGH': return 2;
      case 'MEDIUM': return 3;
      case 'LOW': return 4;
      case 'LOWEST': return 5;
      default: return 0;
    }
  }

  highlightRow(event: MouseEvent) {
    const row = event.currentTarget as HTMLTableRowElement;
    row.classList.add('highlighted');
  }

  unhighlightRow(event: MouseEvent) {
    const row = event.currentTarget as HTMLTableRowElement;
    row.classList.remove('highlighted');
  }

  ngOnInit(): void {
    const userNameFromLocalStorage = localStorage.getItem('userName');
    if (userNameFromLocalStorage) {
      this.loggedUserName = userNameFromLocalStorage;
    } else {
      console.log('No se encontró ningún nombre de usuario en el localStorage.');
    }
    const userIdString = localStorage.getItem('userId');
    var userId;
    if(userIdString != null){
      userId = parseInt(userIdString);
    }else{
      userId = 1;
    }
    this.apiService.getTicketsByUser(userId).subscribe({
      next: (response: any) => {
        console.log('Tickets recibidos', response);
        // Mapear la respuesta de la API utilizando la interfaz iTicketTable
        const tickets: iTicketTable[] = response.$values.map((value: any) => {
          return {
            id: value.id,
            title: value.title,
            name: value.name,
            email: value.email,
            timestamp: this.formatDate(value.timestamp),
            priority: value.priority,
            state: value.state,
            userID: value.userID // Asegúrate de asignar el valor correcto
          };
        });
        this.dataSource.data = tickets; // Establecer los datos en la dataSource
        console.log('Datos mapeados para tabla', tickets);
        this.createChart();
        this.createChart2();
        this.createChart3();
      },
      error: (error: any) => {
        console.error('Error al obtener los tickets del usuario:', error);
      }
    });
  }

  createChart2(): void {
    const canvas = document.getElementById('technicianChart2') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

    const priorities = ['HIGHEST', 'HIGH', 'MEDIUM', 'LOW', 'LOWEST', 'NOT_SURE'];
    const incidentCounts = priorities.map(priority => {
      return this.dataSource.data.filter(ticket => ticket.priority === priority).length;
    });
    console.log('datos al crear grafica', this.dataSource.data)

    // @ts-ignore
    this.chart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: priorities, // Replace with actual technician names
        datasets: [{
          label: 'Incidencias',
          data: incidentCounts, // Replace with actual number of incidents for each technician
          backgroundColor: [
            'rgba(255, 100, 147, 0.2)',
            'rgba(116, 92, 216, 0.2)',
            'rgba(253, 183, 63, 0.2)',
            'rgba(59, 235, 151, 0.2)',
            'rgba(59, 214, 235, 0.2)',
            'rgba(255, 255, 255, 0.2)'
          ],
          borderColor: [
            'rgba(255, 100, 147, 1)',
            'rgba(116, 92, 216, 1)',
            'rgba(253, 183, 63, 1)',
            'rgba(59, 235, 151, 1)',
            'rgba(59, 214, 235, 1)',
            'rgba(255, 255, 255, 1)'
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

  createChart(): void {
    const canvas = document.getElementById('technicianChart') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

    const technicianNames = [localStorage.getItem('userName')]; // Obtener nombres de los técnicos
    const techId = localStorage.getItem('userId')
    var techIdInt = 0;
    if(techId != null){
      techIdInt = parseInt(techId);
    }
    const technicianIds = [techIdInt];
    
    const incidentCounts = technicianIds.map(id => {
      // Calcular el número de incidentes para cada técnico
      return this.dataSource.data.filter(ticket => ticket.userID === id).length;
    });

    // @ts-ignore
    this.chart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: technicianNames, // Replace with actual technician names
        datasets: [{
          label: 'Cantidad de incidencias',
          data: incidentCounts, // Replace with actual number of incidents for each technician
          backgroundColor: [
            'rgba(255, 100, 147, 0.2)',
            'rgba(116, 92, 216, 0.2)',
            'rgba(253, 183, 63, 0.2)',
            'rgba(59, 235, 151, 0.2)',
            'rgba(59, 214, 235, 0.2)',
            'rgba(255, 255, 255, 0.2)'
          ],
          borderColor: [
            'rgba(255, 100, 147, 1)',
            'rgba(116, 92, 216, 1)',
            'rgba(253, 183, 63, 1)',
            'rgba(59, 235, 151, 1)',
            'rgba(59, 214, 235, 1)',
            'rgba(255, 255, 255, 1)'
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
  
    const states = ['PENDING', 'OPENED', 'PAUSED', 'FINISHED'];
    const incidentCounts = states.map(state => {
      // Calcular el número de incidentes para cada técnico
      return this.dataSource.data.filter(ticket => ticket.state === state).length;
    });

    // Generar datos de ejemplo
    const labels = states;
    const data = incidentCounts;
    const backgroundColors = [
      'rgba(255, 100, 147, 0.2)',
      'rgba(116, 92, 216, 0.2)',
      'rgba(253, 183, 63, 0.2)',
      'rgba(59, 235, 151, 0.2)',
    ];
    const borderColors = [
      'rgba(255, 100, 147, 1)',
      'rgba(116, 92, 216, 1)',
      'rgba(253, 183, 63, 1)',
      'rgba(59, 235, 151, 1)',
    ];
  
    // Crear el gráfico utilizando Chart.js
    // @ts-ignore
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Estado de incidencias',
          data: data,
          backgroundColor: backgroundColors,
          borderColor: borderColors,
          borderWidth: 1
        }]
      }
    });
  }

  formatDate(fecha: string): string {
    const fechaObj = new Date(fecha);
    const dia = fechaObj.getDate().toString().padStart(2, '0');
    const mes = (fechaObj.getMonth() + 1).toString().padStart(2, '0'); // Se suma 1 porque los meses van de 0 a 11
    const año = fechaObj.getFullYear();
    const horas = fechaObj.getHours().toString().padStart(2, '0');
    const minutos = fechaObj.getMinutes().toString().padStart(2, '0');
    const segundos = fechaObj.getSeconds().toString().padStart(2, '0');

    return `${dia}/${mes}/${año} - ${horas}:${minutos}:${segundos}`;
  }

  onRowClicked(row: any) {
    this.selectedRow = row;
    localStorage.setItem('selectedTicket', this.selectedRow.id);
  }

  showTicket() {
    if(localStorage.getItem('selectedTicket') != null) {
      this.router.navigate(['/technician-ticket']);
    }
  }

  logout(){
    this.loginService.logout();
    this.router.navigate(['/login']);
  }

}

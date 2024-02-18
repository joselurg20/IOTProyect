import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ViewChild } from '@angular/core';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Incidencia } from 'src/app/model/incidencia';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { Chart } from 'chart.js/auto';



interface SideNavToggle {
    screenWidth: number;
    collapsed: boolean;
}
const ELEMENT_DATA: Incidencia[] = [
    { number: '1', title: 'Incidencia 1', description: 'Descripcion de la incidencia numero 1', importance: 'Alta', status: 'Abierta', created: '2022-10-01', post: 'Tecnico 1' },
    { number: '2', title: 'Incidencia 2', description: 'Descripcion de la incidencia numero 2', importance: 'Media', status: 'Abierta', created: '2022-10-01', post: 'Tecnico 2' },
    { number: '3', title: 'Incidencia 3', description: 'Descripcion de la incidencia numero 3', importance: 'Baja', status: 'Terminado', created: '2022-10-01', post: 'Tecnico 1' },
    { number: '4', title: 'Incidencia 4', description: 'Descripcion de la incidencia numero 4', importance: 'Alta', status: 'Abierta', created: '2022-10-01', post: 'Tecnico 3' },
    { number: '5', title: 'Incidencia 5', description: 'Descripcion de la incidencia numero 5', importance: 'Media', status: 'Terminado', created: '2022-10-01', post: 'Tecnico 1' },
    { number: '6', title: 'Incidencia 6', description: 'Descripcion de la incidencia numero 6', importance: 'Baja', status: 'Abierta', created: '2022-10-01', post: 'Tecnico 1' },
    { number: '7', title: 'Incidencia 7', description: 'Descripcion de la incidencia numero 7', importance: 'Alta', status: 'Terminado', created: '2022-10-01', post: 'Tecnico 3' },
    { number: '8', title: 'Incidencia 8', description: 'Descripcion de la incidencia numero 8', importance: 'Media', status: 'Abierta', created: '2022-10-01', post: 'Tecnico 1' },
    { number: '9', title: 'Incidencia 9', description: 'Descripcion de la incidencia numero 9', importance: 'Media', status: 'Abierta', created: '2022-10-01', post: 'Tecnico 2' },
    { number: '10', title: 'Incidencia 10', description: 'Descripcion de la incidencia numero 10', importance: 'Baja', status: 'Terminado', created: '2022-10-01', post: 'Tecnico 2' },
]
@Component({
    selector: 'app-support-manager',
    standalone: true,
    templateUrl: './support-manager.component.html',
    styleUrls: ['./support-manager.component.scss'],
    imports: [NavbarComponent, MatTableModule, MatGridListModule, MatCardModule, MatMenuModule, MatIconModule, MatSortModule]
})
export class SupportManagerComponent implements AfterViewInit, OnInit {

    title = 'sidenav'

    chart: any;


    isSideNavCollapsed = false;
    screenWidth = 0;

    onToggleSidenav(data: SideNavToggle): void {
        this.screenWidth = data.screenWidth;
        this.isSideNavCollapsed = data.collapsed;
    }


    displayedColumns: string[] = ['number', 'title', 'description', 'importance', 'status', 'created', 'post'];
    dataSource = new MatTableDataSource(ELEMENT_DATA);

    constructor(private _liveAnnouncer: LiveAnnouncer) { }

    @ViewChild(MatSort) sort!: MatSort;


    announceSortChange(sortState: Sort) {
        if (sortState.direction) {
            this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
        } else {
            this._liveAnnouncer.announce('Sorting cleared');
        }
    }
    openNav() {
        throw new Error('Method not implemented.');
    }

    ngAfterViewInit() {
        this.dataSource.sort = this.sort;
        this.dataSource.sortingDataAccessor = (item, property) => {
            switch (property) {
                case 'importance': return this.getImportanceValue(item.importance);
                default: return item[property];
            }
        };
    }

    getImportanceValue(importance: string): number {
        switch (importance) {
            case 'Alta': return 1;
            case 'Media': return 2;
            case 'Baja': return 3;
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
        this.createChart2();
        this.createChart();
    }

    createChart2(): void {
        const canvas = document.getElementById('technicianChart2') as HTMLCanvasElement;
        const ctx = canvas.getContext('2d');
      
        // @ts-ignore
        this.chart = new Chart(ctx, {
          type: 'pie',
          data: {
            labels: ['Alta', 'Media', 'Baja'], // Replace with actual technician names
            datasets: [{
              label: 'Incidencias', 
              data: [3,4,3], // Replace with actual number of incidents for each technician
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

      createChart(): void {
        const canvas = document.getElementById('technicianChart') as HTMLCanvasElement;
        const ctx = canvas.getContext('2d');
      
        // @ts-ignore
        this.chart = new Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: ['Tecnico 1', 'Tecnico 2', 'Tecnico 3'], // Replace with actual technician names
            datasets: [{
              label: 'Cantidad de incidencias', 
              data: [5,3,2], // Replace with actual number of incidents for each technician
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

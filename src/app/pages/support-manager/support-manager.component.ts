import { AfterViewInit, Component } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ViewChild } from '@angular/core';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';


export interface PeriodicElement {
    number: string;
    title: string;
    description: string;
    importance: string;
    status: string;
    created: string;
    post:'fa-solid fa-file';
    [key: string]: any; // Índice de firma para permitir acceso de propiedad seguro

}

interface SideNavToggle {
    screenWidth: number;
    collapsed: boolean;
  }
const ELEMENT_DATA: PeriodicElement[] = [
    { number: '1', title: 'Incidencia 1', description: 'Incidencia', importance: 'Alta', status: 'Abierta', created: '2022-10-01' , post:'fa-solid fa-file'},
    { number: '2', title: 'Incidencia 2', description: 'Incidencia', importance: 'Media', status: 'Abierta', created: '2022-10-01', post:'fa-solid fa-file'},
    { number: '3', title: 'Incidencia 3', description: 'Incidencia', importance: 'Baja', status: 'Abierta', created: '2022-10-01',post:'fa-solid fa-file' },
    { number: '4', title: 'Incidencia 4', description: 'Incidencia', importance: 'Alta', status: 'Abierta', created: '2022-10-01' , post:'fa-solid fa-file'},
    { number: '5', title: 'Incidencia 5', description: 'Incidencia', importance: 'Media', status: 'Abierta', created: '2022-10-01', post:'fa-solid fa-file'  },
    { number: '5', title: 'Incidencia 5', description: 'Incidencia', importance: 'Media', status: 'Abierta', created: '2022-10-01', post:'fa-solid fa-file'  },
    { number: '6', title: 'Incidencia 6', description: 'Incidencia', importance: 'Baja', status: 'Abierta', created: '2022-10-01', post:'fa-solid fa-file' },
    { number: '7', title: 'Incidencia 7', description: 'Incidencia', importance: 'Alta', status: 'Abierta', created: '2022-10-01',post:'fa-solid fa-file' },
    { number: '8', title: 'Incidencia 8', description: 'Incidencia', importance: 'Media', status: 'Abierta', created: '2022-10-01', post:'fa-solid fa-file' },
] 
@Component({
    selector: 'app-support-manager',
    standalone: true,
    templateUrl: './support-manager.component.html',
    styleUrls: ['./support-manager.component.scss'],
    imports: [NavbarComponent, MatTableModule, MatSortModule]
})
export class SupportManagerComponent implements AfterViewInit {
    title='sidenav'
    
    isSideNavCollapsed = false;
    screenWidth=0;

    onToggleSidenav(data:SideNavToggle): void{
        this.screenWidth = data.screenWidth;
        this.isSideNavCollapsed = data.collapsed;
    }


    displayedColumns: string[] = ['number', 'title', 'description', 'importance', 'status', 'created'];
    dataSource = new MatTableDataSource(ELEMENT_DATA);

    constructor(private _liveAnnouncer: LiveAnnouncer) { }

    @ViewChild(MatSort) sort!: MatSort;


    /** Announce the change in sort state for assistive technology. */
    announceSortChange(sortState: Sort) {
        // This example uses English messages. If your application supports
        // multiple language, you would internationalize these strings.
        // Furthermore, you can customize the message to add additional
        // details about the values being sorted.
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

}

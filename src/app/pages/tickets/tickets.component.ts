import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { iTicketDescriptor } from 'src/app/model/iTicketDescriptor';
import { ApiService } from 'src/app/services/api.sevice';
import { iTicket } from 'src/app/model/iTicket';
import { iUserTable } from 'src/app/model/iUserTable';
import { FormsModule } from '@angular/forms';
@Component({
    selector: 'app-tickets',
    standalone: true,
    templateUrl: './tickets.component.html',
    styleUrls: ['./tickets.component.scss'],
    imports: [CommonModule, NavbarComponent, FormsModule]
})
export class TicketsComponent implements OnInit {

  public ticket: iTicketDescriptor = {} as iTicketDescriptor;
  public user: iUserTable = {} as iUserTable;
  public users: iUserTable[] = [];
  public priorities: string[] = ['NOT_SURE', 'LOWEST', 'LOW', 'MEDIUM', 'HIGH', 'HIGHEST'];
  public states: string[] = ['PENDING', 'OPENED', 'PAUSED', 'FINISHED'];
  selectedUserId: number = 0;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    const selectedTicket = localStorage.getItem('selectedTicket');
    if(selectedTicket != null){
      this.apiService.getTicketById(+selectedTicket).subscribe({
        next: (response: any) => {
          this.ticket = {
            id: response.id,
            title: response.title,
            name: response.name,
            email: response.email,
            timestamp: this.formatDate(response.timestamp),
            priority: response.priority,
            state: response.state,
            userID: response.userID,
            userName: "",
            messages: []
          };
          console.log('Ticket Recibido', this.ticket);
          this.apiService.getUserById(this.ticket.userID).subscribe({
            next: (response: any) => {
              this.user = {
                id: response.id,
                userName: response.userName,
                email: response.email,
                phoneNumber: response.phoneNumber
              };
            },
            error: (error: any) => {
              console.error('Error al obtener el usuario', error);
            }
          });
        },
        error: (error: any) => {
          console.error('Error al obtener el ticket', error);
        }
      });
      
      this.apiService.getUsers().subscribe({
        next: (response: any) => {
          this.users = response.$values.map((value: any) => {
            return {
              id: value.id,
              userName: value.userName,
              email: value.email,
              phoneNumber: value.phoneNumber
            };
          });
        },
        error: (error: any) => {
          console.error('Error al obtener los usuarios', error);
        }
      })
    }
    
  }

  asignTicket() {
    if(this.selectedUserId != 0){
      if (this.selectedUserId) {
        this.apiService.assignTechnician(this.ticket.id, this.selectedUserId).subscribe({
            next: () => {
                console.log('Técnico asignado correctamente');
            },
            error: (error: any) => {
                console.error('Error al asignar técnico', error);
            }
        });
    } else {
        console.warn('Por favor, seleccione un técnico');
    }
    }
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


}


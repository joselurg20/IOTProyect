// tickets.component.ts
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.sevice';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent implements OnInit {
  users: any[] = []; // Cambiado de user a users

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getUsers().subscribe(
      (users: any[]) => { // Cambiado de user a users
        console.log(users); // Agregar este console.log para verificar los datos recibidos
        this.users = users; // Cambiado de user a users
      },
      error => {
        console.error('Error al obtener la lista de usuarios:', error);
      }
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.sevice';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent implements OnInit {
  users: any[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getUsers().subscribe(
      (response: any) => { // Cambiado de users a response
        console.log(response); // Agregar este console.log para verificar los datos recibidos
        if (response && response.$values && response.$values.length > 0) {
          this.users = response.$values;
        }
      },
      error => {
        console.error('Error al obtener la lista de usuarios:', error);
      }
    );
  }
}

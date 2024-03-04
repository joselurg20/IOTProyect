// api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { iTicket } from '../model/iTicket';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  assignTechnician(ticketId: number, technicianId: number) {
    throw new Error('Method not implemented.');
  }
  changeTicketStatus(ticketId: number, newStatus: string) {
    throw new Error('Method not implemented.');
  }
  private apiUrl = 'https://localhost:7233/api'; // URL base de tu API

  constructor(private http: HttpClient) { }

  // Método para obtener la lista de usuarios
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/User`);
  }

  getTickets(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/Ticket`);
  }

  getTicketsByUser(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/Ticket/tickets-${userId}`);
  }
}

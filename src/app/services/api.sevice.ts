// api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { iTicket } from '../model/iTicket';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://localhost:7233/api'; // URL base de tu API

  constructor(private http: HttpClient) { }

  // Método para obtener la lista de usuarios
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/User`);
  }

  getUserById(userId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/User/${userId}`);
  }

  getTickets(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/Ticket`);
  }

  getTicketsByUser(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/Ticket/tickets-${userId}`);
  }

  getTicketById(ticketId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Ticket/${ticketId}`);
  }
  
  assignTechnician(ticketId: number, userId: number) {
    return this.http.put<any>(`${this.apiUrl}/Ticket/${ticketId}-asign-${userId}`, null);
  }
  changeTicketStatus(ticketId: number, newStatus: string) {
    throw new Error('Method not implemented.');
  }
}

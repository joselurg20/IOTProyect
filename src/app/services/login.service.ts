import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private readonly apiUrl = 'https://localhost:7233/api/user/login';
  private readonly tokenKey = 'authToken';
  private readonly userIdKey = 'userId';
  private readonly roleKey = 'userRole';

  // BehaviorSubject para almacenar el token de autenticación
  private authTokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  // BehaviorSubject para almacenar el ID del usuario
  private userIdSubject: BehaviorSubject<number | null> = new BehaviorSubject<number | null>(null);
  // BehaviorSubject para almacenar el rol del usuario
  private roleSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient) {
    // Al inicializar el servicio, verifica si hay un token almacenado en localStorage
    const storedToken = localStorage.getItem(this.tokenKey);
    if (storedToken) {
      this.authTokenSubject.next(storedToken);
    }
  }

  // Método para realizar la solicitud de inicio de sesión y almacenar el token de autenticación
  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { email, password }).pipe(
      tap(response => {
        if (response && response.token) {
          // Almacenar el token de autenticación en localStorage
          localStorage.setItem(this.tokenKey, response.token);
          // Actualizar el BehaviorSubject con el nuevo token
          this.authTokenSubject.next(response.token);
          // Almacenar otros datos del usuario si son devueltos por el backend
          if (response.userId) {
            localStorage.setItem(this.userIdKey, response.userId);
            this.userIdSubject.next(response.userId);
          }
          if (response.role) {
            localStorage.setItem(this.roleKey, response.role);
            this.roleSubject.next(response.role);
          }
        }
      })
    );
  }

  // Método para cerrar sesión y eliminar el token de autenticación
  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userIdKey);
    localStorage.removeItem(this.roleKey);
    this.authTokenSubject.next(null);
    this.userIdSubject.next(null);
    this.roleSubject.next(null);
  }

  // Métodos para acceder a los BehaviorSubjects
  getAuthToken(): Observable<string | null> {
    return this.authTokenSubject.asObservable();
  }

  getUserId(): Observable<number | null> {
    return this.userIdSubject.asObservable();
  }

  getUserRole(): Observable<string | null> {
    return this.roleSubject.asObservable();
  }
}
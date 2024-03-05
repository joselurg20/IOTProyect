import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { iTicketDescriptor } from 'src/app/model/iTicketDescriptor';
import { iUserTable } from 'src/app/model/iUserTable';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.sevice';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { iMessage } from 'src/app/model/iMessage';

@Component({
  selector: 'app-technician-ticket',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './technician-ticket.component.html',
  styleUrls: ['./technician-ticket.component.scss']
})
export class TechnicianTicketComponent implements OnInit {

  public ticket: iTicketDescriptor = {} as iTicketDescriptor;
  public user: iUserTable = {} as iUserTable;
  public messages: iMessage[] = [];
  public messageForm!: FormGroup;
  private readonly apiUrl = 'https://localhost:7233/api/Message';
  successMsg: string = "";
  previewUrl: string | ArrayBuffer | null = null;
  isImageSelected: boolean = false;

  constructor(private apiService: ApiService, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.messageForm = new FormGroup({
      Attachments: new FormControl('', null),
      Content: new FormControl('', Validators.required)
    });
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
          this.apiService.getMessagesByTicket(this.ticket.id).subscribe({
            next: (response: any) => {
              console.log('response', response);
              this.messages = response.$values.map((message: any) => {
                return {
                  Id: message.id,
                  Content: message.content,
                  AttachmentPaths: message.attachmentPaths.$values.map((attachmentPath: any) => attachmentPath.path),
                  ticketID: message.ticketID
                }
              })
            },
            error: (error: any) => {
              console.error('Error al obtener los mensajes del ticket', error);
            }
          });
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
    }
    
  }

  onSubmit() {
    if(this.messageForm.valid) {
      console.log('Datos del formulario:', this.messageForm.value);
      const Content = this.messageForm.value.Content;
      this.createMessage(Content, this.ticket.id)
      .subscribe({
        next: (response) => {
          console.log('Message creado con éxito', response);
          this.successMsg = "Mensaje creado con éxito.";
          location.reload(); 
        },
        error: (error) => {
          console.error('Error en la solicitud', error);
          this.successMsg = "Error al crear el mensaje.";
        }
      });
    }
  }

  goBack() {
    localStorage.removeItem('selectedTicket');
    this.router.navigate(['/support-technician']);
  }

  createMessage(Content: string, TicketID: number): Observable<any> {
    const formData = new FormData();
    formData.append('MessageDTO.Content', Content);
    formData.append('MessageDTO.TicketID', TicketID.toString());
    
    const attachmentsControl = this.messageForm.get('Attachments');
  
    if (attachmentsControl) {
      const attachments = attachmentsControl.value;
      
      if (typeof attachments === 'string') {
        const fileInput = <HTMLInputElement>document.getElementById('Attachments');
        if (fileInput && fileInput.files && fileInput.files.length > 0) {
          formData.append('MessageDTO.Attachments', fileInput.files[0], fileInput.files[0].name);
        }
      } else if (Array.isArray(attachments) && attachments.length > 0) {
        for (const attachment of attachments) {
          formData.append('MessageDTO.Attachments', attachment, attachment.name);
        }
      }
    }
  
    return this.http.post<any>(this.apiUrl, formData);
  }

  downloadAttachment(attachmentPath: string) {
    const pathPrefix = 'C:/ProyectoIoT/Back/ApiTest/AttachmentStorage/';
    const fileName = attachmentPath.substring(pathPrefix.length);
    this.downloadFile(attachmentPath, fileName);
  }
  
  downloadFile(data: any, fileName: string) {
    const blob = new Blob([data], { type: 'application/octet-stream' });
  
    const url = window.URL.createObjectURL(blob);
  
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
  
    link.click();
  
    window.URL.revokeObjectURL(url);
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

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result;
      };
      reader.readAsDataURL(file);
      this.isImageSelected = file.type.startsWith('image/');
    }
  }

}

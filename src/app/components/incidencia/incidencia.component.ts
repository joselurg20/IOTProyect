import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { TMessageDTO } from 'src/app/model/TMessageDTO';
import { TicketCreationDTO } from 'src/app/model/TicketCreationDTO';
import { TicketDTO } from 'src/app/model/TicketDTO';

@Component({
  selector: 'app-incidencia',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './incidencia.component.html',
  styleUrls: ['./incidencia.component.scss']
})
export class IncidenciaComponent implements OnInit {
  public ticketForm!: FormGroup;
  private readonly apiUrl = 'https://localhost:7233/api/Ticket';

  constructor(private http: HttpClient){}

  ngOnInit() {
    this.ticketForm = new FormGroup({
      Title: new FormControl('', Validators.required),
      Content: new FormControl('', Validators.required),
      Attachments: new FormControl('', null),
      Name: new FormControl('', Validators.required),
      Email: new FormControl('', [Validators.required, Validators.email])
    });
  }

  onSubmit() {
    if(this.ticketForm.valid) {
      console.log('Datos del formulario:', this.ticketForm.value);
      const Title = this.ticketForm.value.Title;
      const Content = this.ticketForm.value.Content;
      const Name = this.ticketForm.value.Name;
      const Email = this.ticketForm.value.Email;
      this.createTicket(Title, Content, Name, Email)
      .subscribe({
        next: (response) => {
          console.log('Ticket creado con éxito', response);
        },
        error: (error) => {
          console.error('Error en la solicitud', error);
        }
      });
      
    }
  }

  createTicket(Title: string, Content: string, Name: string, Email: string): Observable<any> {
    const formData = new FormData();
    formData.append('TicketDTO.Title', Title);
    formData.append('TicketDTO.Name', Name);
    formData.append('TicketDTO.Email', Email);
    formData.append('MessageDTO.Content', Content);
    
    const attachmentsControl = this.ticketForm.get('Attachments');
  
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

}

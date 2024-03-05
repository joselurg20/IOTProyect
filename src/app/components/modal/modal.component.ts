import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { iMessage } from 'src/app/model/iMessage';
import { ApiService } from 'src/app/services/api.sevice';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  ticketId: number = 0;
  messages: iMessage[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    var ticketIdLS = localStorage.getItem('selectedTicket');
    if(ticketIdLS != null){
      this.ticketId = +ticketIdLS;
    }
    console.log('ticketId',this.ticketId);
    if (this.ticketId) {
      this.apiService.getMessagesByTicket(this.ticketId).subscribe({
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
    }
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
}

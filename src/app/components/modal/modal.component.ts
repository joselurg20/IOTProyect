import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {

  @Input() archivoSeleccionado: File | null = null;
  vistaPrevia: string | ArrayBuffer | null = null;

  constructor() { }

  ngOnChanges() {
    if (this.archivoSeleccionado) {
      const reader = new FileReader();
      reader.onload = () => {
        this.vistaPrevia = reader.result;
      };
      reader.readAsDataURL(this.archivoSeleccionado);
    }
  }
}

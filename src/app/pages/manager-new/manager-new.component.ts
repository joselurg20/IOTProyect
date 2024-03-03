import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IncidenciaComponent } from 'src/app/components/incidencia/incidencia.component';


@Component({
  selector: 'app-manager-new',
  standalone: true,
  imports: [CommonModule, RouterModule, FontAwesomeModule, IncidenciaComponent],
  templateUrl: './manager-new.component.html',
  styleUrls: ['./manager-new.component.scss']
})
export class ManagerNewComponent {

}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IncidenciaComponent } from 'src/app/components/incidencia/incidencia.component';



@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule, RouterModule, FontAwesomeModule, IncidenciaComponent],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent {

}

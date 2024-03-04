import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
@Component({
    selector: 'app-tickets',
    standalone: true,
    templateUrl: './tickets.component.html',
    styleUrls: ['./tickets.component.scss'],
    imports: [CommonModule, NavbarComponent]
})
export class TicketsComponent implements OnInit {

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }


}


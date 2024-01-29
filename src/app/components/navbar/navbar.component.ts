import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  esButtonPressed: boolean = true;
  enButtonPressed: boolean = false;

  ngOnInit(): void {
    // Código de inicialización si es necesario
  }

  toggleButtons(language: string) {
    if (language === 'es') {
      this.esButtonPressed = true;
      this.enButtonPressed = false;
    } else if (language === 'en') {
      this.esButtonPressed = false;
      this.enButtonPressed = true;
    }
  }

  logout(){
    localStorage.clear();
    window.location.reload();
  }

}
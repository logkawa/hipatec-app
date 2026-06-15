import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class NavbarComponent  implements OnInit {

  public userROLE: string = 'aluna'; // vou criar assim pra testar, depois a gente cria os usuários certinho
  
  constructor(private router: Router) { }

  ngOnInit() {}

  goToProfile() {
    // aqui você pode usar o Router para navegar para a página de perfil
    // por exemplo: this.router.navigate(['/profile']);
    this.router.navigate(['/profile']); 
  }
}

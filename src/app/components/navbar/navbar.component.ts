import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PerfilService } from '../../services/perfil.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class NavbarComponent  implements OnInit {

  public userROLE: string = '';
  public profileImage: string = 'https://ionicframework.com/docs/img/demos/avatar.svg';
  
  constructor(private router: Router, private perfilService: PerfilService) { }

  ngOnInit() {
    this.loadUserProfile();
  }

  private loadUserProfile() {
    const userRole = localStorage.getItem('userRole');
    const userId = localStorage.getItem('userId');

    if (userRole && userId) {
      this.userROLE = userRole;
      this.perfilService.getPerfil(userRole, parseInt(userId)).subscribe({
        next: (profile: any) => {
          if (profile.pfp) {
            this.profileImage = profile.pfp;
            localStorage.setItem('pfpPerfil', profile.pfp);
            localStorage.setItem('perfil', profile.id || '');
          }
        },
        error: (err) => {
          console.error('Error loading profile:', err);
        }
      });
    }
  }

  goToProfile() {
    // aqui você pode usar o Router para navegar para a página de perfil
    // por exemplo: this.router.navigate(['/profile']);
    this.router.navigate(['/profile']); 
  }
  goToMentoria() {
    // aqui você pode usar o Router para navegar para a página de mentoria
    // por exemplo: this.router.navigate(['/mentoria']);
    this.router.navigate(['/mentorias']); 
  }
  goToHome() {
    this.router.navigate(['/home']); 
  }

}

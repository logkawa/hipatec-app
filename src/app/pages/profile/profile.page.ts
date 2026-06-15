import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { EstudanteService } from '../../services/estudante.service';
import { MentoraService } from '../../services/mentora.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, NavbarComponent]
})
export class ProfilePage implements OnInit {

  constructor(private estudanteService: EstudanteService, private mentoraService: MentoraService) { }
  userRole = localStorage.getItem('userRole');
  userId = Number(localStorage.getItem('userId'));

  perfil: any;

  ngOnInit() {
    const service =
      this.userRole === 'estudantes'
        ? this.estudanteService
        : this.mentoraService;

    service.getPerfil(this.userId)
      .subscribe(perfil => {
        this.perfil = perfil;
        console.log(perfil);
      });
  }
}

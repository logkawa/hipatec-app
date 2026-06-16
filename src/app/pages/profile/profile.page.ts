import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { EstudanteService } from '../../services/estudante.service';
import { MentoraService } from '../../services/mentora.service';
import { PerfilService } from '../../services/perfil.service';
import { EditProfileModalComponent } from '../../components/edit-profile-modal/edit-profile-modal.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, NavbarComponent, EditProfileModalComponent]
})
export class ProfilePage implements OnInit {
  showEditModal = false;
  selectedFile?: File;

  constructor(private estudanteService: EstudanteService, private mentoraService: MentoraService, private perfilService: PerfilService) { }
  userRole = localStorage.getItem('userRole');
  userId = Number(localStorage.getItem('userId'));

  perfil: any;

  ngOnInit() {

    this.userRole = localStorage.getItem('userRole');
    this.userId = Number(localStorage.getItem('userId'));

    this.perfilService
      .getPerfil(this.userRole!, this.userId)
      .subscribe(perfil => {

        this.perfil = perfil;

        console.log('Perfil carregado:', perfil);

      });
  } 

  editProfile() {
    this.showEditModal = true;
  }

  onProfileSaved(updated: any) {
    this.perfil = updated || this.perfil;
    this.showEditModal = false;
  }

  salvarFromModal(payload: { perfil: any; file?: File | null }) {
    this.selectedFile = payload.file || undefined;

    const formData = new FormData();

    formData.append('nome', payload.perfil.nome);
    formData.append('usuario', payload.perfil.usuario);
    formData.append('biografia', payload.perfil.biografia);

    if (this.selectedFile) {
      formData.append('foto', this.selectedFile);
    }

    this.perfilService
      .updatePerfil(
        this.userRole || '',
        this.userId,
        formData
      )
      .subscribe({
        next: (perfil: any) => {
          console.log(perfil);
          alert('Perfil atualizado!');
          this.perfil = perfil || { ...this.perfil, ...(payload.perfil || {}) };
          this.showEditModal = false;
        },
        error: (err) => {
          console.error(err);
        }
      });
  }
}


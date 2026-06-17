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
  imports: [
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar, 
    CommonModule, 
    FormsModule, 
    NavbarComponent, 
    EditProfileModalComponent
  ]
})
export class ProfilePage implements OnInit {
  showEditModal = false;
  selectedPfpFile?: File;
  selectedBackgroundFile?: File;
  isSaving = false;

  constructor(
    private estudanteService: EstudanteService, 
    private mentoraService: MentoraService, 
    private perfilService: PerfilService
  ) {}

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

  salvarFromModal(payload: { perfil: any; pfpFile?: File | null; backgroundFile?: File | null }) {
    if (this.isSaving) return;
    
    this.selectedPfpFile = payload.pfpFile || undefined;
    this.selectedBackgroundFile = payload.backgroundFile || undefined;

    const formData = new FormData();

    // Adicionar campos obrigatórios
    formData.append('nome', payload.perfil.nome || '');
    formData.append('usuario', payload.perfil.usuario || '');
    formData.append('biografia', payload.perfil.biografia || '');

    // Adicionar foto de perfil se selecionada
    if (this.selectedPfpFile) {
      formData.append('pfp', this.selectedPfpFile, this.selectedPfpFile.name);
    }

    // Adicionar imagem de fundo se selecionada
    if (this.selectedBackgroundFile) {
      formData.append('background', this.selectedBackgroundFile, this.selectedBackgroundFile.name);
    }

    this.isSaving = true;

    console.log(formData);

    this.perfilService
      .updatePerfil(
        this.userRole || '',
        this.userId,
        formData
      )
      .subscribe({
        next: (perfil: any) => {
          console.log('Perfil atualizado:', perfil);
          alert('Perfil atualizado com sucesso!');
          
          // Atualizar o perfil local com os dados retornados
          this.perfil = { 
            ...this.perfil, 
            ...(payload.perfil || {}),
            pfp: perfil.pfp || this.perfil?.pfp,
            background: perfil.background || this.perfil?.background
          };
          
          this.showEditModal = false;
          this.isSaving = false;
        },
        error: (err) => {
          console.error('Erro ao atualizar perfil:', err);
          alert('Erro ao atualizar perfil. Tente novamente.');
          this.isSaving = false;
        }
      });
  }
}
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { IonicModule, ModalController } from '@ionic/angular';
import { MentoriasService, Mentoria } from '../../services/mentorias.service';

@Component({
  selector: 'app-mentorias',
  templateUrl: './mentorias.page.html',
  styleUrls: ['./mentorias.page.scss'],
  imports: [IonicModule, CommonModule, FormsModule, NavbarComponent],
  standalone: true
})

export class MentoriasPage implements OnInit {

  public userRole: string = 'aluna'; // papel de usuária teste

  // mentorias carregadas do backend
  public minhasMentorias: Mentoria[] = [];

  public mentoriasDisponiveis = [
    { id: 10, titulo: 'Mentoria de Carreira', mentora: 'Ana Silva', descricao: 'Como se preparar para entrevistas.' },
    { id: 11, titulo: 'Mentoria Tech', mentora: 'Bia Costa', descricao: 'Dicas de arquitetura Angular.' },
  ];

  constructor(private modalCtrl: ModalController, private mentoriasService: MentoriasService) { }

  ngOnInit() {
    this.loadMentorias();
  }

  loadMentorias() {
    this.mentoriasService.getAll().subscribe({
      next: (data) => this.minhasMentorias = data,
      error: (err) => {
        console.error('Erro ao carregar mentorias', err);
        // fallback: keep empty or optionally set sample data
      }
    });
  }

  async abrirDetalhes(item: any) {
    console.log('Abrindo detalhes de:', item);
  }

}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { IonicModule, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-mentorias',
  templateUrl: './mentorias.page.html',
  styleUrls: ['./mentorias.page.scss'],
  imports: [IonicModule, CommonModule, FormsModule, NavbarComponent],
  standalone: true
})

export class MentoriasPage implements OnInit {

  public userRole: string = 'aluna'; // papel de usuária teste

  // dados simulados (quando o banco chegar, você só substituirá estes dois array)
  public minhasMentorias = [
    { id: 1, titulo: 'Curso 1', status: 'Ativo', descricao: 'Lógica de programação', progresso: 0.6 },
    { id: 2, titulo: 'Curso 2', status: 'Finalizado', descricao: 'UX Design Avançado', progresso: 1.0 },
    { id: 3, titulo: 'Curso 3', status: 'Pendente', descricao: 'Banco de Dados SQL', progresso: 0.2 },
  ];

  public mentoriasDisponiveis = [
    { id: 10, titulo: 'Mentoria de Carreira', mentora: 'Ana Silva', descricao: 'Como se preparar para entrevistas.' },
    { id: 11, titulo: 'Mentoria Tech', mentora: 'Bia Costa', descricao: 'Dicas de arquitetura Angular.' },
  ];

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  async abrirDetalhes(item: any) {
    console.log('Abrindo detalhes de:', item);
  }

}

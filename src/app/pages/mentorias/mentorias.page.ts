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
    { id: 1, titulo: 'Lógica de programação', descricao: 'Lógica de programação do ZERO para iniciantes', progresso: 0.6 },
    { id: 2, titulo: 'Fundamentos do UX Design', descricao: 'Fundamentos do UX Design', progresso: 1.0 },
    { id: 3, titulo: 'Banco de Dados SQL', descricao: 'Banco de Dados SQL e Lógica de BD', progresso: 0.2 },
    { id: 4, titulo: 'Introdução à Inteligência Artificial', descricao: 'Inteligência Artificial', progresso: 0.2 },
    { id: 5, titulo: 'Desenvolvimento Web', descricao: 'Desenvolvimento Web com HTML, CSS e JavaScript', progresso: 0.4 },
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

import { Component } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { heartOutline, chatbubbleOutline, heart, add } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { CreatePostModalComponent } from '../components/create-post-modal/create-post-modal.component';
import { CommentModalComponent } from '../components/comment-modal/comment-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, NavbarComponent]
})

export class HomePage {

  public iconeCurtir = heartOutline;
  public iconeComentar = chatbubbleOutline;
  public iconeCurtido = heart;

  // matriz simulando os dados vindos do banco **** substituir
  posts = [
    {
      id: 1,
      autor: 'Ana Paula',
      role: 'Aluna',
      tempo: '2h',
      texto: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quis ex in massa congue facilisis vel ac nulla.',
      curtidas: 12,
      curtidoUsuario: false,
      comentarios: 5
    },
    {
      id: 2,
      autor: 'Yasmin Nunes',
      role: 'Aluna',
      tempo: '5h',
      texto: 'Fusce ante purus, porttitor id sollicitudin id, sollicitudin vel metus. Donec eget aliquam metus. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      curtidas: 8,
      curtidoUsuario: false,
      comentarios: 3
    },
    {
      id: 3,
      autor: 'Mariana Silva',
      role: 'Mentora',
      tempo: '1 dia',
      texto: 'Pellentesque tempor nisi ac est ornare lobortis.',
      curtidas: 20,
      curtidoUsuario: false,
      comentarios: 10
    },
    {
      id: 4,
      autor: 'Luana Oliveira',
      role: 'Aluna',
      tempo: '3h',
      texto: 'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit libero, facilisis nec malesuada ut, ultricies eu orci.Fusce ante purus, porttitor id sollicitudin id, sollicitudin vel metus. Donec eget aliquam metus. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      curtidas: 5,
      curtidoUsuario: false,
      comentarios: 2
    },
    {
      id: 5,
      autor: 'Carla Mendes',
      role: 'Mentora',
      tempo: '1 dia',
      texto: 'Nullam id dolor id nibh ultricies vehicula ut id elit.Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit libero, facilisis nec malesuada ut, ultricies eu orci.Fusce ante purus, porttitor id sollicitudin id, sollicitudin vel metus. Donec eget aliquam metus. Lorem ipsum dolor sit amet, consectetur adipiscing elit.Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit libero, facilisis nec malesuada ut, ultricies eu orci.Fusce ante purus, porttitor id sollicitudin id, sollicitudin vel metus. Donec eget aliquam metus. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      curtidas: 15,
      curtidoUsuario: false,
      comentarios: 7
    }
  ];

  // matriz para os itens da barra lateral ****esse n sei como podemos fazer, ja que seria um certo algoritmo para sugerir as pessoas, mas vou deixar aqui como exemplo
  sugestoes = [
    { nome: 'Nathalia Ventura', arroba: '@kawkdev' },
    { nome: 'Thiago Barbosa', arroba: '@thiwink' },
    { nome: 'Lucca Rosa', arroba: '@rosalucca' }
  ];

  constructor(private modalController: ModalController) {
    addIcons({ heartOutline, heart, chatbubbleOutline, add });
  }

  toggleCurtida(post: any) {
    if (post.curtidoUsuario) {
      post.curtidas--;
      post.curtidoUsuario = false;
    } else {
      post.curtidas++;
      post.curtidoUsuario = true;
    }
  }

  // Nova função para somar comentários
  simularComentario(post: any) {
    // Por enquanto, apenas soma +1 ao contador para simular a ação
    post.comentarios++;
  }

  async abrirModalPost() {
    const modal = await this.modalController.create({
      component: CreatePostModalComponent,
      cssClass: 'custom-modal-post' // Classe opcional para estilizar o fundo do modal futuramente
    });
    return await modal.present();
  }

  async abrirModalComentario(post: any) {
    const modal = await this.modalController.create({
      component: CommentModalComponent,
      cssClass: 'custom-modal-post', // Reaproveitando o CSS do outro modal!
      componentProps: {
        postSelecionado: post // Passando o post inteiro para dentro do modal
      }
    });
    return await modal.present();
  }
}
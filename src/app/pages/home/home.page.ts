import { Component, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { heartOutline, chatbubbleOutline, heart, add } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { CreatePostModalComponent } from '../../components/create-post-modal/create-post-modal.component';
import { CommentModalComponent } from '../../components/comment-modal/comment-modal.component';
import { PostsService } from '../../services/posts.service';
import { PerfilService, Perfil } from '../../services/perfil.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, NavbarComponent]
})

export class HomePage implements OnInit {

  public iconeCurtir = heartOutline;
  public iconeComentar = chatbubbleOutline;
  public iconeCurtido = heart;

  // matriz simulando os dados vindos do banco **** substituir
  posts: any[] = [];

  // matriz para os itens da barra lateral ****esse n sei como podemos fazer, ja que seria um certo algoritmo para sugerir as pessoas, mas vou deixar aqui como exemplo
  sugestoes = [
    { nome: 'Nathalia Ventura', arroba: '@kawkdev' },
    { nome: 'Thiago Barbosa', arroba: '@thiwink' },
    { nome: 'Lucca Rosa', arroba: '@rosalucca' }
  ];

  constructor(
    private modalController: ModalController,
    private postsService: PostsService,
    private perfilService: PerfilService
  ) {
    addIcons({ heartOutline, heart, chatbubbleOutline, add });
  }

  ngOnInit() {
    this.buscarPosts();
  }

  buscarPosts() {
    forkJoin({
      posts: this.postsService.getPosts(),
      perfis: this.perfilService.getPerfis()
    }).subscribe({
      next: ({ posts, perfis }) => {
        this.posts = posts.map(post => this.mapPost(post, perfis));
      },
      error: (err) => {
        console.error('Erro ao buscar posts:', err);
      }
    });
  }

  private mapPost(post: any, perfis: Perfil[]) {
    const perfil = perfis.find(p => p.id === post.autorId);
    const autor = perfil?.usuario || `Usuário ${post.autorId}`;
    const avatar = perfil?.pfp || post.autorFoto || 'https://ionicframework.com/docs/img/demos/avatar.svg';

    return {
      ...post,
      autor,
      avatar,
      tempo: this.formatPostTime(post.dataCriacao),
      curtidas: post.likesCount ?? 0,
      comentarios: post.commentsCount ?? 0,
      curtidoUsuario: false
    };
  }

  private formatPostTime(timestamp: number) {
    const now = Date.now();
    const diffMs = now - timestamp;
    const diffSeconds = Math.floor(diffMs / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffSeconds < 60) {
      return 'agora';
    }
    if (diffMinutes < 60) {
      return `há ${diffMinutes} min`;
    }
    if (diffHours < 24) {
      return `há ${diffHours} h`;
    }
    return `há ${diffDays} dia${diffDays > 1 ? 's' : ''}`;
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
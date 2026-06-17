import { Component, Input } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { close, imageOutline } from 'ionicons/icons';

@Component({
  selector: 'app-comment-modal',
  templateUrl: './comment-modal.component.html',
  styleUrls: ['./comment-modal.component.scss'],
  standalone: true,
  imports: [IonicModule]
})
export class CommentModalComponent {
  // Recebe os dados do post clicado
  @Input() postSelecionado: any;

  public iconeFechar = close;
  public iconeImagem = imageOutline;

  constructor(private modalController: ModalController) {}

  fechar() {
    this.modalController.dismiss();
  }
  
  // Função rápida para simular um @arroba juntando o nome sem espaços
  getArroba() {
    if (!this.postSelecionado || !this.postSelecionado.autor) return '';
    return '@' + this.postSelecionado.autor.replace(/\s+/g, '').toLowerCase();
  }
}

import { Component} from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { close, imageOutline } from 'ionicons/icons';

@Component({
  selector: 'app-create-post-modal',
  templateUrl: './create-post-modal.component.html',
  styleUrls: ['./create-post-modal.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})

export class CreatePostModalComponent {
  // 2. Variáveis para o HTML enxergar
  public iconeFechar = close;
  public iconeImagem = imageOutline;

  constructor(private modalController: ModalController) {}

  fechar() {
    this.modalController.dismiss();
  }
}
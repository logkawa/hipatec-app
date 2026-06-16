import { Component, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-profile-modal',
  templateUrl: './edit-profile-modal.component.html',
  styleUrls: ['./edit-profile-modal.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class EditProfileModalComponent {
  @Input() show = false;
  @Input() perfil: any;
  @Output() close = new EventEmitter<void>();
  // Emit a request for the parent page to perform the actual save (payload: { perfil, file })
  @Output() requestSave = new EventEmitter<{ perfil: any; file?: File | null }>();

  editModel: any = {};
  selectedFile: File | null = null;
  previewUrl: string | null = null;
  saving = false;

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['perfil']) {
      this.editModel = { ...(this.perfil || {}) };
      this.previewUrl = this.perfil?.pfp || null;
      this.selectedFile = null;
    }
  }

  closeModal() {
    this.close.emit();
  }

  onFileSelected(event: any) {
    const file: File = event.target.files && event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = e => this.previewUrl = (e.target as any).result;
      reader.readAsDataURL(file);
    }
  }

  saveProfile() {
    if (this.saving) return;
    this.saving = true;

    // Emit save request to parent. Parent page will perform the HTTP upload.
    this.requestSave.emit({ perfil: this.editModel, file: this.selectedFile });
    // leave saving state; parent will close the modal on success
    this.saving = false;
  }
}

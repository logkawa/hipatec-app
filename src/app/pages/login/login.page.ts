import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonInput, IonButton, IonItem, IonLabel, IonSegment, IonSegmentButton, IonList } from '@ionic/angular/standalone';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonInput, IonButton, IonItem, IonLabel, IonSegment, IonSegmentButton, IonList, CommonModule, FormsModule, HttpClientModule]
})
export class LoginPage implements OnInit {

  role: 'estudantes' | 'mentoras' = 'estudantes';
  email = '';
  password = '';

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  switchRole(ev: any) {
    this.role = ev.detail?.value || 'estudantes';
    this.email = '';
    this.password = '';
  }

  login() {
    if (!this.email || !this.password) {
      alert('Informe email e senha para continuar.');
      return;
    }

    this.auth.login(this.role, this.email, this.password)
      .subscribe({
        next: response => {
          console.log('API login response:', response);
          if (response.token) {
            this.auth.saveToken(response.token);
          }
          alert(response.message || `Login successful for ${this.role}`);
          this.router.navigate(['/mentorias']);
        },
        error: err => {
          console.error('API login error:', err);
          alert('Login failed. Verifique seus dados e tente novamente.');
        }
      });
  }

}

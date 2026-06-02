import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  constructor(public authService: AuthService, private router: Router) {}

  credentials = { username: '', password: '' };
  errorMessage = '';
  onLoginSubmit() {
    this.authService.login(this.credentials).subscribe({
      next: () => {
        this.errorMessage = '';
        this.credentials = { username: '', password: '' }; 
        this.router.navigate(['/dashboard']); 
      },
      error: (err) => {
        this.errorMessage = err.error || 'Invalid username or password.';
      }
    });
  }

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/']); 
  }
  
}
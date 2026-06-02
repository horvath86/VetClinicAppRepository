import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms'; // 1. Must import FormsModule here!
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, FormsModule], // 2. Declared here!
  templateUrl: './app.component.html'
})
export class AppComponent {
  constructor(public authService: AuthService, private router: Router) {}

  credentials = { username: '', password: '' };
  errorMessage = '';

  onNavbarLoginSubmit() {
    this.authService.login(this.credentials).subscribe({
      next: () => {
        this.errorMessage = '';
        this.credentials = { username: '', password: '' }; // Clear fields
        this.router.navigate(['/dashboard']); // Route inside on success
      },
      error: (err) => {
        this.errorMessage = err.error || 'Failed.';
      }
    });
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/']); 
  }
}
import { Component, OnInit } from '@angular/core';
import {FormsModule} from "@angular/forms";
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { VeterinarianService } from '../../services/veterinarian.service';

@Component({
  selector: 'app-veterinarian-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './veterinarian-form.component.html',
  styleUrl: './veterinarian-form.component.css'
})
export class VeterinarianFormComponent implements OnInit {

  constructor(private veterinarianService: VeterinarianService, private router: Router, private route: ActivatedRoute) {}

  veterinarianDTO = {
    name: '',
    email: '',
    password: '',
    passConfirm: ''
  };

  ngOnInit(): void {
    this.route.paramMap.subscribe((result) => {
      const id = result.get('id');
      if (id) {
        this.isEditing = true;
        this.veterinarianService.GetVeterinarianById(+id).subscribe({
          next: (response) => {
            this.veterinarianDTO = 
            {  
              name: response.name,
              email: response.email,
              password: '',
              passConfirm: ''
            };
          },
          error: (error) => {
            this.errorMessage = 'Error fetching veterinarian details. Please try again.';
            console.error('Error fetching veterinarian details:', error);
          }
        });
      }
    });
  }

  isEditing: boolean = false;
  errorMessage: string = '';

  onSubmit(): void {
    if (this.veterinarianDTO.password !== this.veterinarianDTO.passConfirm) {
      this.errorMessage = 'Passwords do not match. Please try again.';
      return;
    }

    if (this.isEditing) {
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.veterinarianService.updateVeterinarian(+id, this.veterinarianDTO).subscribe({
          next: () => this.router.navigate(['/veterinarians']),
          error: (error) => {
            this.errorMessage = 'Error updating veterinarian. Please try again.';
            console.error('Error updating veterinarian:', error);
          }
        });
      }
    } else {
      this.veterinarianService.createVeterinarian(this.veterinarianDTO).subscribe({
        next: () => this.router.navigate(['/veterinarians']),
        error: (error) => {
          this.errorMessage = 'Error creating veterinarian. Please try again.';
          console.error('Error creating veterinarian:', error);
        }
      });
    }
  }

}

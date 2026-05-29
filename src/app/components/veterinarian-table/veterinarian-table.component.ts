import { Component, OnInit } from '@angular/core';
import { Veterinarian } from '../../models/veterinarian';
import { VeterinarianService } from '../../services/veterinarian.service';
import { CommonModule } from "@angular/common";
import { Router } from '@angular/router';

@Component({
  selector: 'app-veterinarian-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './veterinarian-table.component.html',
  styleUrl: './veterinarian-table.component.css'
})
export class VeterinarianTableComponent implements OnInit{
  
  veterinarians: Veterinarian[] = [];

  constructor(private veterinarianService: VeterinarianService, private router: Router) { }

  ngOnInit(): void {
    this.veterinarianService.getVeterinarians().subscribe((data: Veterinarian[]) =>
      {
        this.veterinarians = data;
        console.log(data);
      });
  }

  deleteVeterinarian(id: number): void {
    this.veterinarianService.deleteVeterinarian(id).subscribe({
      next: () => {
        this.veterinarians = this.veterinarians.filter(vet => vet.id !== id);
      },
      error: (error) => { console.error('Error deleting veterinarian:', error); }
    });

  }

  updateVeterinarian(id: number): void {
    this.router.navigate([`/updateVeterinarian/${id}`]);
    console.log('Update veterinarian with ID:', id);
  }


}

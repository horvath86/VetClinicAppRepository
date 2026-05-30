import { Component, OnInit } from '@angular/core';
import {FormsModule} from "@angular/forms";
import { CommonModule } from '@angular/common';
import { MedicalRecordService } from '../../services/medical-record.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MedicalRecordDTO } from '../../models/medicalRecordDTO';
import { VeterinarianService } from '../../services/veterinarian.service';
import { Veterinarian } from '../../models/veterinarian';
import { AnimalService } from '../../services/animal.service';
import {Animal} from "../../models/animal";

@Component({
  selector: 'app-medical-record-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './medical-record-form.component.html',
  styleUrl: './medical-record-form.component.css'
})
export class MedicalRecordFormComponent implements OnInit {

  isEditing: boolean = false;
  errorMessage: string = '';
  veterinarians: Veterinarian[] = [];
  animals: Animal[] = [];

  medicalRecordDTO = {
    animalId: 0,
    vetId: 0,
    visitDate: new Date(),
    symptoms: '',
    diagnosis: '',
    notes: ''
  };

  constructor(private medicalRecordService: MedicalRecordService, private router: Router, private route: ActivatedRoute, private veterinarianService: VeterinarianService, private animalService: AnimalService) { }

  ngOnInit(): void {
      this.loadVeterinarians();
      this.loadAnimals();
      this.route.paramMap.subscribe((result) => {
        const id = result.get('id');
        if (id) {
          this.isEditing = true;
          this.medicalRecordService.getMedicalRecordById(+id).subscribe({
            next: (response) => {
              this.medicalRecordDTO = {
                animalId: response.animalId,
                vetId: response.vetId,
                visitDate: response.visitDate,
                symptoms: response.symptoms,
                diagnosis: response.diagnosis,
                notes: response.notes || 'No notes'
              };
            }
          });
        }
      });
  }

  loadVeterinarians(): void {
    this.veterinarianService.getVeterinarians().subscribe({
      next: (data : Veterinarian[]) => {
        this.veterinarians = data;
      },
      error: () => {
        this.errorMessage = 'Error loading veterinarians';
      }
    });
  }

  loadAnimals(): void {
    this.animalService.getAnimals().subscribe({
      next: (data: Animal[]) => {
        this.animals = data;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load animals.';
        console.error(err);
      }
    });
  }

  getVetName(vetId: number): string {
  const vet = this.veterinarians.find(v => v.id === vetId);
  return vet ? `${vet.name}` : 'Unknown Veterinarian';
  }

  onSubmit(): void {
    if (this.isEditing) 
    {
      const id = this.route.snapshot.paramMap.get('id');
      if (id) 
      {
        this.medicalRecordService.updateMedicalRecord(+id, this.medicalRecordDTO).subscribe({
          next: () => {
            this.router.navigate(['/medicalRecords']);
          },
          error: (error) => {
            this.errorMessage = 'Error updating medical record';
          }
        });
      }
    }
    else 
    {   
        this.medicalRecordService.createMedicalRecord(this.medicalRecordDTO).subscribe({
          next: () => {
            this.router.navigate(['/medicalRecords']);
          },
          error: (error) => {
            this.errorMessage = 'Error creating medical record';
          }
        });
      
    }
  }
}


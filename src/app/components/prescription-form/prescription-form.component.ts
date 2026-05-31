import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import { PrescriptionService } from '../../services/prescription.service';
import { Prescription } from '../../models/prescription';
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import { PrescriptionDTO } from '../../models/prescriptionDTO';
import { MedNameEnum } from '../../Enums/MedName.enum';



@Component({
  selector: 'app-prescription-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './prescription-form.component.html',
  styleUrl: './prescription-form.component.css'
})
export class PrescriptionFormComponent implements OnInit {

  isEditing: boolean = false;
  errorMessage: string = '';

  prescriptionDTO: PrescriptionDTO = {
    medicalRecordId: 0,
    medName: 0,
    dosage: 0,
    frequencyInHrs: 0,
    durationInDays: 0
  };

  MedName = Object.values(MedNameEnum).filter(value => typeof value === 'string');
  selectedMedName: MedNameEnum = 0;

  constructor(private prescriptionService: PrescriptionService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((result)=>{
      const id = result.get("id");
      if(id)
      {
        this .isEditing = true;
        this.prescriptionService.getPrescriptionById(+id).subscribe({
          next: (response) => {
            this.prescriptionDTO = {
              medicalRecordId: response.medicalRecordId,
              medName: response.medName,
              dosage: response.dosage,
              frequencyInHrs: response.frequencyInHrs,
              durationInDays:response.durationInDays
            }
          }
        })
      }

    })
  }

  onSubmit(): void {
    if (this.isEditing) 
    {
      const id = this.route.snapshot.paramMap.get("id");
      if(id)
      {
        this.prescriptionService.updatePrescription(+id,this.prescriptionDTO).subscribe({
          next: (response) => {
            this.router.navigate(['/prescriptions'])
          },
          error: (error) => {
            this.errorMessage = 'Error updating prescription, Please try again.';
            console.error('Error updating prescription:', error);
          }
          
        })
      }
    }else{
      this.prescriptionService.createPrescription(this.prescriptionDTO).subscribe({
          next: (response) => {
            this.router.navigate(['/prescriptions']);
          },
          error: (error) => {
            this.errorMessage = 'Error creating prescription. Please try again.';
            console.error('Error creating prescription:', error);
          }
        })
    }
        
      
    }
  }



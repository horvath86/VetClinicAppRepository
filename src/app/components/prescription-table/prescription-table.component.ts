import { Component, OnInit } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { PrescriptionService } from '../../services/prescription.service';
import { Prescription } from '../../models/prescription';
import { MedicalRecord } from '../../models/medicalRecord';
import { MedNameEnum } from '../../Enums/MedName.enum';


@Component({
  selector: 'app-prescription-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './prescription-table.component.html',
  styleUrl: './prescription-table.component.css'
})

export class PrescriptionTableComponent implements OnInit {

  prescriptions: Prescription[] = [];
  medicalRecords: MedicalRecord[] = [];
  selectedRecordId: number | null = null;
  prescriptionForm!: FormGroup;

  medName = MedNameEnum;

  constructor( private prescriptionService: PrescriptionService, private router: Router, private route: ActivatedRoute) { }

  //page initialization
  ngOnInit(): void {
    const medicalRecordId = this.route.snapshot.queryParamMap.get('medicalRecordId');    
    
    //prefill form with medical record id
    if (medicalRecordId) {
      this.prescriptionForm.patchValue({ 
        medicalRecordId: +medicalRecordId 
      });
    }
   
  }

  //deleting prescription
  deletePrescription(id: number): void {
    this.prescriptionService.deletePrescription(id).subscribe({
      next: () => {
        this.prescriptions = this.prescriptions.filter(p => p.id !== id);
      },
      error: (err) => { console.error('Error deleting prescription:', err); }
    });
  }

  //updating prescription
  updatePrescription(id: number): void {
    this.router.navigate([`/updatePrescription/${id}`]);
    console.log('Update prescription with ID:', id);
  }
  
  //Filter prescriptions by medicalRecordID
  filterByMedicalRecord(medicalRecordId: number): void {
    this.selectedRecordId = medicalRecordId;
    
    this.prescriptionService.getPrescriptionsByMedicalRecord(medicalRecordId).subscribe({
      next: (data) => {
        this.prescriptions = data;
      },
      error: (err) => { 
        console.error('Error filtering prescriptions:', err); 
      }
    });
  }
 
}




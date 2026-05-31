import { Component, OnInit } from '@angular/core';
import { CommonModule } from "@angular/common";
import { PrescriptionService } from '../../services/prescription.service';
import { Router } from '@angular/router';
import { Prescription } from '../../models/prescription';
import { MedicalRecord } from '../../models/medicalRecord';
import { forkJoin } from 'rxjs';
import { MedicalRecordService } from '../../services/medical-record.service';
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

  medName = MedNameEnum;

  constructor(private medicalRecordService: MedicalRecordService, private prescriptionService: PrescriptionService, private router: Router) { }

  ngOnInit(): void {

    this.loadData();
  }

  deletePrescription(id: number): void {
    this.prescriptionService.deletePrescription(id).subscribe({
      next: () => {
        this.prescriptions = this.prescriptions.filter(p => p.id !== id);
      },
      error: (err) => { console.error('Error deleting prescription:', err); }
    });
  }

  updatePrescription(id: number): void {
    this.router.navigate([`/updatePrescription/${id}`]);
    console.log('Update prescription with ID:', id);
  }
  
  loadData(): void {
    forkJoin({
      prescriptions: this.prescriptionService.getAllPrescriptions(),
      medicalRecords: this.medicalRecordService.getMedicalRecords()
    }).subscribe({
      next: (result) => {
        this.prescriptions = result.prescriptions;
        this.medicalRecords = result.medicalRecords;
      },
      error: (err) => { 
        console.error('Error fetching data:', err); 
      }
    });
  }


}

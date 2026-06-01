import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from "@angular/common";
import { MedicalRecord } from '../../models/medicalRecord';
import { MedicalRecordService } from '../../services/medical-record.service';
import { Router } from '@angular/router';
import { Veterinarian } from '../../models/veterinarian';
import {VeterinarianService} from "../../services/veterinarian.service";
import {forkJoin} from "rxjs";
import { PrescriptionTableComponent } from '../prescription-table/prescription-table.component';
import { ProcedureTableComponent } from '../procedure-table/procedure-table.component';

@Component({
  selector: 'app-medical-record-table',
  standalone: true,
  imports: [CommonModule, PrescriptionTableComponent, ProcedureTableComponent],
  templateUrl: './medical-record-table.component.html',
  styleUrl: './medical-record-table.component.css'
})
export class MedicalRecordTableComponent implements OnInit {

  medicalRecords: MedicalRecord[] = [];
  veterinarians: Veterinarian[] = [];

  @ViewChild(PrescriptionTableComponent) prescriptionTable!: PrescriptionTableComponent;
  @ViewChild(ProcedureTableComponent) procedureTable!: ProcedureTableComponent;

  constructor(private medicalRecordService: MedicalRecordService, private router: Router, private veterinarianService: VeterinarianService) { }

  ngOnInit(): void {
    forkJoin({
      medicalRecords: this.medicalRecordService.getMedicalRecords(),
      veterinarians: this.veterinarianService.getVeterinarians()
    }).subscribe({
      next: (result) => {
        this.medicalRecords = result.medicalRecords;
        this.veterinarians = result.veterinarians;
      },
      error: (err) => { console.error('Error fetching data:', err); }
    });
  }

  getVeterinarianName(vetId: number): string {
    const vet = this.veterinarians.find(v => v.id === vetId);
    return vet ? vet.name : 'Unknown Veterinarian';
  }

  deleteMedicalRecord(id: number): void {
    this.medicalRecordService.deleteMedicalRecord(id).subscribe({
      next: () => {
        this.medicalRecords = this.medicalRecords.filter(record => record.id !== id);
      },
      error: (err) => { console.error('Error deleting medical record:', err); }
    });
  }

  updateMedicalRecord(id: number): void {
    this.router.navigate([`/updateMedicalRecord/${id}`]);
    console.log('Update medical record with ID:', id);
  }

  showPresAndProcbyID(id : number): void
  {
    this.prescriptionTable.filterByMedicalRecord(id);
    this.procedureTable.filterByMedicalRecord(id);
  }

  addPrescription(id: number)
  {
    this.router.navigate(['/createPrescription'], { 
    queryParams: { medicalRecordId: id } 
  });
  }

  addProcedure(id: number)
  {
    this.router.navigate(['/createProcedure'], { 
    queryParams: { medicalRecordId: id } 
  });
  }

}

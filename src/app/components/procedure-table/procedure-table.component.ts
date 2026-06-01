import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Procedure } from '../../models/procedure';
import { MedicalRecord } from '../../models/medicalRecord';
import { ProcedureService } from '../../services/procedure.service';
import { MedicalRecordService } from '../../services/medical-record.service';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { ProcedureType } from '../../Enums/ProcedureType.enum';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-procedure-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './procedure-table.component.html',
  styleUrl: './procedure-table.component.css'
})
export class ProcedureTableComponent implements OnInit{

  procedures : Procedure[] = [];
  medicalRecords : MedicalRecord[] = [];

  procedureType = ProcedureType;
  selectedRecordId: number | null = null;
  prescriptionForm!: FormGroup;

  constructor(private procedureService: ProcedureService, private medicalRecordService: MedicalRecordService, private router: Router, private route: ActivatedRoute){}

  ngOnInit(): void {
    const medicalRecordId = this.route.snapshot.queryParamMap.get('medicalRecordId');  

    //prefill form with medical record id
    if (medicalRecordId) {
      this.prescriptionForm.patchValue({ 
        medicalRecordId: +medicalRecordId 
      });
    }
  }

  deleteProcedure(id: number):void{
    this.procedureService.deleteProcedure(id).subscribe({
      next : () => {
        this.procedures = this.procedures.filter(p => p.id !== id);
      },
      error: (err) => {
        console.error('Error deleting procedure:', err);
      }
    })
  }

  updateProcedure(id:number): void {
    this.router.navigate([`/updateProcedure/${id}`]);
    console.log('Update procedure with ID:', id);
  }

  //Filter prescriptions by medicalRecordID
  filterByMedicalRecord(medicalRecordId: number): void {
    this.selectedRecordId = medicalRecordId;
    
    this.procedureService.getProceduresByMedicalRecord(medicalRecordId).subscribe({
      next: (data) => {
        this.procedures = data;
      },
      error: (err) => { 
        console.error('Error filtering prescriptions:', err); 
      }
    });
  }

}

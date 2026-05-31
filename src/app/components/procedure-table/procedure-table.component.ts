import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Procedure } from '../../models/procedure';
import { MedicalRecord } from '../../models/medicalRecord';
import { ProcedureService } from '../../services/procedure.service';
import { MedicalRecordService } from '../../services/medical-record.service';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { ProcedureType } from '../../Enums/ProcedureType.enum';

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

  constructor(private procedureService: ProcedureService, private medicalRecordService: MedicalRecordService, private router: Router){}

  ngOnInit(): void {
    this.loadData();
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

  loadData(): void {
    forkJoin({
      procedures: this.procedureService.getAllProcedures(),
      medicalRecords: this.medicalRecordService.getMedicalRecords()
    }).subscribe({
      next: (result) => {
        this.procedures = result.procedures;
        this.medicalRecords = result.medicalRecords;
      },
      error: (err) => {
        console.error('Error fetching data:', err);
      }
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MedicalRecordService } from '../../services/medical-record.service';
import { ProcedureService } from '../../services/procedure.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MedicalRecord } from '../../models/medicalRecord';
import { ProcedureDTO } from '../../models/procedureDTO';
import { ProcedureType } from '../../Enums/ProcedureType.enum';

@Component({
  selector: 'app-procedure-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './procedure-form.component.html',
  styleUrl: './procedure-form.component.css'
})
export class ProcedureFormComponent implements OnInit{

  isEditing: boolean = false;
  errorMessage: string = "";

  medicalRecords: MedicalRecord[] = [];

  procedureDTO : ProcedureDTO = {
    medicalRecordId: 0,
    procedureType: 0,
    notes: "",
    anesthesiaUsed: false
  };

  ProcType = Object.values(ProcedureType).filter(value => typeof value === 'string');
  selectedProcType: ProcedureType = 0;

  constructor(private medicalrecordService : MedicalRecordService, private procedureService: ProcedureService, private router: Router, private route: ActivatedRoute){}

  ngOnInit(): void {
    this.loadMedRecords();
    this.route.paramMap.subscribe((result) => {
      const id = result.get("id");
      if(id)
      {
        this.isEditing = true;
        this.procedureService.getProcedureById(+id).subscribe({
          next: (response) => {
            this.procedureDTO = {
              medicalRecordId: response.medicalRecordId,
              procedureType: response.procedureType,
              notes: response.notes,
              anesthesiaUsed: response.anesthesiaUsed
            }
          }
        })
      }
      
    })
    
  }

  loadMedRecords(): void {
    this.medicalrecordService.getMedicalRecords().subscribe({
      next: (data: MedicalRecord[]) => {
        this.medicalRecords = data;
      },
      error: () => {
        this.errorMessage = "Error loading medical records";
      }
    });
  }

  onSubmit(): void
  {
      if(this.isEditing)
      {
        const id = this.route.snapshot.paramMap.get("id");
        if(id)
        {
            this.procedureService.updateProcedure(+id,this.procedureDTO).subscribe({
              next: (response) => {
                this.router.navigate(['/procedures']);
              },
              error : (error) => {
                this.errorMessage = 'Error updating procedure. Please try again.';
                console.error('Error updating procedure:',error);
              }
            })
        }
      } else {
        this.procedureService.createProcedure(this.procedureDTO).subscribe({
          next: (response) => {
            this.router.navigate(['/procedures']);
          },
          error: (error) => {
            this.errorMessage = 'Error creating procedure. Please try again.';
            console.error('Error creating procedure:',error)
          }
        })
      }
  }

}

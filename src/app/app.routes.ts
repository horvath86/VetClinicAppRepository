import { Routes } from '@angular/router';
import { AnimalTableComponent } from './components/animal-table/animal-table.component';
import { AnimalFormComponent } from './components/animal-form/animal-form.component';
import { VeterinarianTableComponent } from './components/veterinarian-table/veterinarian-table.component';
import { VeterinarianFormComponent } from './components/veterinarian-form/veterinarian-form.component';
import { MedicalRecordTableComponent } from './components/medical-record-table/medical-record-table.component';
import { MedicalRecordFormComponent } from './components/medical-record-form/medical-record-form.component';
import { PrescriptionTableComponent } from './components/prescription-table/prescription-table.component';
import { PrescriptionFormComponent } from './components/prescription-form/prescription-form.component';
import { ProcedureTableComponent } from './components/procedure-table/procedure-table.component';
import { ProcedureFormComponent } from './components/procedure-form/procedure-form.component';
import { AppointmentTableComponent } from './components/appointment-table/appointment-table.component';
import { AppointmentFormComponent } from './components/appointment-form/appointment-form.component';

export const routes: Routes = [
  { path: '', component: AnimalTableComponent },
  { path: 'create', component: AnimalFormComponent },
  { path: 'update/:id', component: AnimalFormComponent },
  { path: 'animals', redirectTo: '', pathMatch: 'full' },
  { path: 'veterinarians', component: VeterinarianTableComponent },
  { path: 'createVeterinarian', component: VeterinarianFormComponent },
  { path: 'updateVeterinarian/:id', component: VeterinarianFormComponent },
  { path: 'medicalRecords', component: MedicalRecordTableComponent},
  { path: "createMedicalRecord", component: MedicalRecordFormComponent },
  { path: "updateMedicalRecord/:id", component: MedicalRecordFormComponent },
  { path: "prescriptions", component: PrescriptionTableComponent },
  { path: "createPrescription", component: PrescriptionFormComponent },
  { path: "updatePrescription/:id", component: PrescriptionFormComponent },
  { path: "procedures", component: ProcedureTableComponent},
  { path: "createProcedure", component: ProcedureFormComponent},
  { path: "updateProcedure/:id", component: ProcedureFormComponent},
  { path: "appointments", component:AppointmentTableComponent},
  { path: "createAppointment", component:AppointmentFormComponent},
  { path: "updateAppointment/:id", component:AppointmentFormComponent}


  
];

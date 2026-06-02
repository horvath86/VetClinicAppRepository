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
import { HomeComponent } from './components/home/home.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  { path: '', component:HomeComponent},
  { path: 'animals', component: AnimalTableComponent, canActivate: [authGuard] },
  { path: 'createAnimal', component: AnimalFormComponent, canActivate: [authGuard] },
  { path: 'updateAnimal/:id', component: AnimalFormComponent, canActivate: [authGuard] },
  { path: 'veterinarians', component: VeterinarianTableComponent , canActivate: [authGuard]},
  { path: 'createVeterinarian', component: VeterinarianFormComponent },
  { path: 'updateVeterinarian/:id', component: VeterinarianFormComponent , canActivate: [authGuard]},
  { path: 'medicalRecords', component: MedicalRecordTableComponent, canActivate: [authGuard]},
  { path: "createMedicalRecord", component: MedicalRecordFormComponent , canActivate: [authGuard]},
  { path: "updateMedicalRecord/:id", component: MedicalRecordFormComponent, canActivate: [authGuard] },
  { path: "prescriptions", component: PrescriptionTableComponent , canActivate: [authGuard]},
  { path: "createPrescription", component: PrescriptionFormComponent , canActivate: [authGuard]},
  { path: "updatePrescription/:id", component: PrescriptionFormComponent , canActivate: [authGuard]},
  { path: "procedures", component: ProcedureTableComponent, canActivate: [authGuard]},
  { path: "createProcedure", component: ProcedureFormComponent, canActivate: [authGuard]},
  { path: "updateProcedure/:id", component: ProcedureFormComponent, canActivate: [authGuard]},
  { path: "appointments", component:AppointmentTableComponent, canActivate: [authGuard]},
  { path: "createAppointment", component:AppointmentFormComponent, canActivate: [authGuard]},
  { path: "updateAppointment/:id", component:AppointmentFormComponent, canActivate: [authGuard] },
  {path: '**', redirectTo: '' }

  
];

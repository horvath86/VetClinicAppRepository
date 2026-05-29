import { Routes } from '@angular/router';
import { AnimalTableComponent } from './components/animal-table/animal-table.component';
import { AnimalFormComponent } from './components/animal-form/animal-form.component';
import { VeterinarianTableComponent } from './components/veterinarian-table/veterinarian-table.component';
import { VeterinarianFormComponent } from './components/veterinarian-form/veterinarian-form.component';

export const routes: Routes = [
  { path: '', component: AnimalTableComponent },
  { path: 'create', component: AnimalFormComponent },
  { path: 'update/:id', component: AnimalFormComponent },
  { path: 'animals', redirectTo: '', pathMatch: 'full' },
  { path: 'veterinarians', component: VeterinarianTableComponent },
  { path: 'createVeterinarian', component: VeterinarianFormComponent },
  { path: 'updateVeterinarian/:id', component: VeterinarianFormComponent }
];

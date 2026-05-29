import { Routes } from '@angular/router';
import { AnimalTableComponent } from './components/animal-table/animal-table.component';
import { AnimalFormComponent } from './components/animal-form/animal-form.component';

export const routes: Routes = [
  { path: '', component: AnimalTableComponent },
  { path: 'create', component: AnimalFormComponent },
  { path: 'update/:id', component: AnimalFormComponent },
  { path: 'animals', redirectTo: '', pathMatch: 'full' }
];

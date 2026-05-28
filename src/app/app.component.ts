import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AnimalTableComponent } from './components/animal-table/animal-table.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AnimalTableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'vet-clinic-app';
}

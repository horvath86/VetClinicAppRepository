import { Component, OnInit } from '@angular/core';
import { Animal } from '../../models/animal';
import { AnimalService } from '../../services/animal.service';
import { CommonModule } from "@angular/common";
import { SpeciesEnum } from '../../Enums/Species.enum';
import { GenderEnum } from '../../Enums/Gender.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-animal-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './animal-table.component.html',
  styleUrl: './animal-table.component.css'
})
export class AnimalTableComponent implements OnInit 
{

  animals: Animal[] = [];

  Species = SpeciesEnum;
  Gender = GenderEnum;

  constructor(private animalService: AnimalService, private router: Router) { }

  ngOnInit()
  {
    this.animalService.getAnimals().subscribe((data: Animal[]) => 
    {
      this.animals = data;
      console.log(data);
    });

  }

  deleteAnimal(id: number): void {
    this.animalService.DeleteAnimal(id).subscribe({
      next: () => {
        this.animals = this.animals.filter(animal => animal.id !== id);
      },
      error: (err) => { console.error('Error deleting animal:', err); }
    });
  }

  updateAnimal(id: number): void {
    this.router.navigate([`/update/${id}`]);
    console.log('Update animal with ID:', id);
  }

}

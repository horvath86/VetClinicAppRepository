import { Component, OnInit } from '@angular/core';
import { Animal } from '../../models/animal';
import { AnimalService } from '../../services/animal.service';
import { CommonModule } from "@angular/common";
import { SpeciesEnum } from '../../Enums/Species.enum';
import { GenderEnum } from '../../Enums/Gender.enum';

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

  constructor(private animalService: AnimalService) { }

  ngOnInit()
  {
    this.animalService.getAnimals().subscribe((data: Animal[]) => 
    {
      this.animals = data;
      console.log(data);
    });

  }

}

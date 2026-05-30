import { Component, OnInit } from '@angular/core';
import {FormsModule} from "@angular/forms";
import { AnimalDTO } from '../../models/animalDTO';
import { SpeciesEnum } from '../../Enums/Species.enum';
import {CommonModule} from "@angular/common";
import { GenderEnum } from '../../Enums/Gender.enum';
import { AnimalService } from '../../services/animal.service';
import {Router, ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-animal-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './animal-form.component.html',
  styleUrl: './animal-form.component.css'
})
export class AnimalFormComponent implements OnInit {

  animalDTO : AnimalDTO = {
    name: '',
    species: 0,
    dateOfBirth: new Date(),
    gender: 0,
    ownerName: '',
    phone: '',
  }

  constructor(private animalService: AnimalService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void 
  {
    this.route.paramMap.subscribe((result) => 
    {
      const id = result.get('id');
      if (id) {
        this.isEditing = true;
        this.animalService.GetAnimalById(+id).subscribe({
          next: (response) => {
            this.animalDTO = {
              name: response.name,
              species: response.species,
              dateOfBirth: response.dateOfBirth,
              gender: response.gender,
              ownerName: response.ownerName,
              phone: response.phone
            };
          },
          error: (error) => {
            this.errorMessage = 'Error fetching animal details. Please try again.';
            console.error('Error fetching animal details:', error);
          }
        });
      } else {
        this.isEditing = false;
      }
    });
  }

  

  isEditing: boolean = false;
  errorMessage: string = '';

  Species = Object.values(SpeciesEnum).filter(value => typeof value === 'string');
  selectedSpecies: SpeciesEnum = 0;

  Gender = Object.values(GenderEnum).filter(value => typeof value === 'string');
  selectedGender: GenderEnum = 0;

  onSubmit() : void {

    if (this.isEditing){
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.animalService.UpdateAnimal(+id, this.animalDTO).subscribe({
          next: (response) => {
            this.router.navigate(['/']);
          },
          error: (error) => {            
            this.errorMessage = 'Error updating animal. Please try again.';
            console.error('Error updating animal:', error);
          }
        });
      }
    } else {
        this.animalService.CreateAnimal(this.animalDTO).subscribe({
        next: (response) => {
        this.router.navigate(['/']);
        },
       error: (error) => {
        this.errorMessage = 'Error creating animal. Please try again.';
        console.error('Error creating animal:', error);
      }
    });
    }

    
  }
}

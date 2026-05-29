import { GenderEnum } from "../Enums/Gender.enum";
import { SpeciesEnum } from "../Enums/Species.enum";

export interface AnimalDTO {
    name: string;
    species: SpeciesEnum;
    dateOfBirth: Date;
    gender: GenderEnum;
    ownerName: string;
    phone: string;
}
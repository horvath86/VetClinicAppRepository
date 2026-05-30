import { Animal } from "./animal";
import { Veterinarian } from "./veterinarian";

export interface MedicalRecord 
{
    id: number;
    animalId: number;
    animal? : Animal;
    vetId: number;
    veterinarian? : Veterinarian;
    visitDate: Date;
    symptoms: string;
    diagnosis: string;
    notes?: string;
}
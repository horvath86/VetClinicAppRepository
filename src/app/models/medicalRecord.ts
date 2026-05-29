export interface MedicalRecord 
{
    id: number;
    animalId: number;
    vetId: number;
    visitDate: Date;
    symptoms: string;
    diagnosis: string;
    notes: string;
}
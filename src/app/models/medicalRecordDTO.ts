export interface MedicalRecordDTO 
{
    animalId: number;
    vetId: number;
    visitDate: Date;
    symptoms: string;
    diagnosis: string;
    notes?: string;
}
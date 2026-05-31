import { MedNameEnum } from "../Enums/MedName.enum";

export interface PrescriptionDTO {
    medicalRecordId: number;
    medName: MedNameEnum;
    dosage: number;
    frequencyInHrs: number;
    durationInDays: number;
}
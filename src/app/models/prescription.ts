import { MedNameEnum } from "../Enums/MedName.enum";
import { MedicalRecord } from "./medicalRecord";

export interface Prescription {
    id: number;
    medicalRecordId: number;
    medicalRecord? : MedicalRecord;
    medName: MedNameEnum;
    dosage: number;
    frequencyInHrs: number;
    durationInDays: number;
}
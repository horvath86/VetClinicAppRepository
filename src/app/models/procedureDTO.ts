import { ProcedureType } from "../Enums/ProcedureType.enum";

export interface ProcedureDTO{
    medicalRecordId: number,
    procedureType: ProcedureType,
    notes: string,
    anesthesiaUsed: boolean
}
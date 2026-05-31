import { ProcedureType } from "../Enums/ProcedureType.enum";

export interface Procedure{
    id: number,
    medicalRecordId: number,
    procedureType: ProcedureType,
    notes: string,
    anesthesiaUsed: boolean
}
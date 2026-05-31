import { StatusEnum } from "../Enums/Status.enum";

export interface Appointment{
    id:number,
    vetId: number;
    dateTime: string;
    status: StatusEnum;
}
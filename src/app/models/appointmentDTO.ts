import { StatusEnum } from "../Enums/Status.enum";

export interface AppointmentDTO{
    vetId: number;
    dateTime: string;
    status: StatusEnum;
}
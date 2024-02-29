import { iTicket } from "./iTicket";

export interface iUser {
    id?: string | number,
    userName: string,
    email: string,
    phoneNumber: string,
    role: string,
    tickets?: iTicket[]
}
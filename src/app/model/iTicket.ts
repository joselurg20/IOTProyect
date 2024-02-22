import { iMessage } from "./iMessage";
import { iUser } from "./iUser";

export interface iTicket {
    id?: string | number,
    title: string,
    name: string,
    email: string,
    timestamp: Date,
    user: iUser,
    priority: string,
    state: string,
    messages: iMessage[]
}
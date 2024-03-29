import { iMessage } from "./iMessage";
import { iUser } from "./iUser";

export interface iTicket {
    id?: string | number,
    title: string,
    name: string,
    email: string,
    timestamp: string,
    user: iUser,
    priority: string,
    state: string,
    messages: iMessage[]
}
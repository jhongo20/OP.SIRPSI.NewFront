import { Bookings } from "../bookings/bookings";
import { Persons } from "../persons/persons";

export interface BookingPersons {
    id: number;
    persona: number;
    reserva: number;
    personaNavigation: Persons;
    reservaNavigation: Bookings;
}
import { Bills } from "../bills/bills";
import { Rooms } from "../rooms/rooms";
import { Users } from "../users/users";

export interface Bookings {
    id: number;
    usuario: number;
    estado: number;
    contactoEmergencia: number;
    habitacion: number;
    fechaInicio: Date;
    fechaFin: Date;
    numeroPersonas: number;
    precioFinal: number;
    factura: Bills;
    habitacionNavigation: Rooms;
    usuarioNavigation: Users;
    personaNavigation: any;
}
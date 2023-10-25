import { RoomTypes } from "../roomTypes/room-types";

export interface DocumentTypes {
    id: number;
    codigo: string;
    tipoDocumento: string;
    tipoHabitacionNavigation: RoomTypes;
}

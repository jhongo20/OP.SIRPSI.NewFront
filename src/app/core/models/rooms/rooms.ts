import { Costs } from "../costs/costs";
import { Hotels } from "../hotels/hotels";

export interface Rooms {
    id: number;
    habitacion: string;
    estado: number;
    piso: number;
    hotel: number;
    tipoHabitacion: number;
    hotelNavigation: Hotels;
    tipoHabitacionNavigation: any;
    costos: Costs[];
    image: string | any;
    price: number | any;
    mensaje: string;
}
export interface Bills {
    id: number;
    reserva: number;
    metodoPago: number;
    estado: number;
    fechaCreacionFactura: Date;
    fechaCancelacionFactura: Date | any;
}
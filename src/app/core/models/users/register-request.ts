export interface RegisterRequest {
    usuario: string;
    contrasena: string;
    confirmarContrasena: string;
    role: number;
    nombres: string;
    apellidos: string;
    fechaNacimiento: Date;
    genero: number;
    tipoDocumento: number;
    numeroDocumento: number;
    email: string;
    telefonoContacto: number;
}
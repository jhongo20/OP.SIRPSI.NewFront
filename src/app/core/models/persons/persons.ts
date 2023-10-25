import { DocumentTypes } from "../documentTypes/document-types";
import { Genders } from "../genders/genders";
import { Users } from "../users/users";

export interface Persons {
    id:number;
    nombres: string;
    apellidos: string;
    fechaNacimiento: Date;
    genero: number;
    tipoDocumento: number;
    email: string | any;
    telefonoContacto: number | any;
    usuario: number | any;
    generoNavigation: Genders;
    tipoDocumentoNavigation: DocumentTypes;
    usuarioNavigation: Users;
}
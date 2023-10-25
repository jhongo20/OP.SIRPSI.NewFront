import { Roles } from "../roles/roles";
import { Routes } from "./routes";

export interface RoutesRole {
    id: number;
    ruta: number;
    role: number;
    rutaNavigation: Routes;
    roleNavigation: Roles;
}
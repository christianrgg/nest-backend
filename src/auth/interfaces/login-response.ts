import { User } from "../entities/user.entity";

// 81. Crear la interface para la respuesta de login
export interface LoginResponse {
    user: User;
    token: string;
}
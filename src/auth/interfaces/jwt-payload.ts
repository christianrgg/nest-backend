// 73. Interfaces pra decir que información grabar en el JTW, llevar este al tipo anterior del paso 72,

export interface JwtPayload {
    id: string;
    iat?: number;
    exp?: number;
}
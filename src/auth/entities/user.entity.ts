// 26. Renombrar archivo por user, igual con la clase
// 27. Crear la interface para el usuario.
// 28. Agregar decorador @Schema() e importarlo

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class User { 
// 29. Agregar decorador property a cada uno de los elementos
// 30. Agregar las caracteristicas de cada propiedad
    //_id:string;
    @Prop({unique:true, required:true})
    email: string;

    @Prop({required:true})
    name: string;

    @Prop({minLength:8, required:true})
    password: string;

    @Prop({default:true})
    isActivate: boolean;

    @Prop({type:[String], default: ['user']})
    roles: string[];

}

// 31. Exportar el modelo e importar SchemaFactory
export const UserSchema = SchemaFactory.createForClass(User);


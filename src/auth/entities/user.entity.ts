import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class User { 

    //_id:string;

    @Prop({unique:true, required:true})
    email: string;

    @Prop({required:true})
    name: string;

    @Prop({minLength:8, required:true})
    password?: string;

    @Prop({default:true})
    isActivate: boolean;

    @Prop({type:[String], default: ['user']})
    roles: string[];

}

export const UserSchema = SchemaFactory.createForClass(User);


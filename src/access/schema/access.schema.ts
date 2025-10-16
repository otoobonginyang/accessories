import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";




@Schema()
export class Access {

@Prop()
brand: string;

@Prop()
productname: string;


@Prop()
color: string;


@Prop()
price: number;


@Prop()
instock: number;

}

export const AccessSchema = SchemaFactory.createForClass(Access);

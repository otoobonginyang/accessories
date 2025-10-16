import { IsNotEmpty, IsNumber, IsString } from "class-validator";



export class CreateAccessDto {

@IsString()
@IsNotEmpty()
brand: string;

@IsString()
@IsNotEmpty()
productname: string;

@IsString()
@IsNotEmpty()
color: string;

@IsNumber()
@IsNotEmpty()
price: number;

@IsNumber()
@IsNotEmpty()
instock: number;

}

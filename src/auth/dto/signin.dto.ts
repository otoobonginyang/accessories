import { IsEmail, IsNotEmpty } from "class-validator";


export class SignInDto {
  static email(email: any, email1: any) {
    throw new Error('Method not implemented.');
  }
  static password(password: any, password1: any) {
    throw new Error('Method not implemented.');
  }
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
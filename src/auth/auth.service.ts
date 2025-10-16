import { HttpException, Injectable, Res } from '@nestjs/common';
import { User} from 'src/user/schema/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import * as bcrypt from 'bcrypt';
import { SignInDto } from './dto/signin.dto';
import { Response } from 'express';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';

@Injectable()
export class AuthService {
constructor(@InjectModel(User.name)
private userModel: Model<User>,
private jwtService: JwtService) {}
      
     //SignUp
  async signup(SignupDto: SignUpDto) {
  SignupDto.email = SignupDto.email.toLowerCase();
  const {username, email} = SignupDto

  //Check if user exist already
  const existinguser = await this.userModel.findOne({email: SignUpDto.email});
  if (existinguser) throw new HttpException ('user already in use', 404);

  //Hash Password
  const hashedpassword = await bcrypt.hash(SignupDto.password, 10);

  //Create new User
  const newUser = new this.userModel({
    username: SignupDto.username,
    email: SignupDto.email,
    password: hashedpassword,
    phonenumber: SignupDto.phonenumber,
    DOB: SignupDto.DOB,
  });

const savedUser = await newUser.save(); //this saves the user to mongoDB


  const userpayload = {id: newUser.id, username: newUser.username,
                      email: newUser.email,
                       password: newUser.password, 
                       phonenumber: newUser.phonenumber,
                       DOB: newUser.DOB}
 
    return {userid: newUser.id, username: newUser.username, email: newUser.email,
            password: newUser.password, ...Res,
            token: this.jwtService.sign(userpayload),
             message: 'User Created Successfully'}
  }



      //SignIn
  async SignIn(SignInDto: SignInDto, @Res() res:Response){
   SignInDto.email = SignInDto.email.toLowerCase();

     //Find user by email
  const user = await this.userModel.findOne({email:SignInDto.email});
  if (!user) throw new HttpException ('Invalid Credentials', 404);

    //To generate Token
  const token = await this.jwtService.signAsync({id:user.id,
                email:user.email, password: user.password});
  if(!token) throw new HttpException('Token not found', 404);

    //Remove Password from response
  const {password, ...userData} = user.toObject();
  return ({ message: 'Sigin Successful', accessToken: token, user: userData});
  

  }
}

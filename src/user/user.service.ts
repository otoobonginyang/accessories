import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schema/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  remove(arg0: number) {
    throw new Error('Method not implemented.');
  }
constructor(@InjectModel(User.name)
private readonly userModel: Model<User>,) {}


 async create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

      //Find All Users
  async findAll(): Promise<{user:User[], message:string}> {
  const user = await this.userModel.find().exec();
   return { user, message: 'All Users have been Found' };
  }


      //Find Only One User
  async findOne(id: string) : Promise<{user:User, message:string}> {
  const user = await this.userModel.findById(id).exec();
  if (!user) throw new NotFoundException ('User Not Found');
    return { user, message: 'Succesfully Found User'}; 
  }
      
      //Update One User
  async update(id: string, updateUserDto: UpdateUserDto) {
  if (updateUserDto.password){
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
  }
  const user = await this.userModel.findByIdAndUpdate(id, updateUserDto, {
    new: true,}).exec();
  if (!user) throw new NotFoundException ('User Not Updated');
    return {user, message: 'User Updated'};
  }

     //Delete One User
  async delete(id: string): Promise<{user: User, message: string}> {
  const user = await this.userModel.findByIdAndDelete(id).exec();
  if (!user) throw new NotFoundException ('User Not Found');
    return { user, message: 'User Deleted Successfully' };
  }
  
  //To Validate User Credentials
  // async validateUser(email: string, password: string): Promise<User>{
  // const user =await this.userModel.findOne({email}).exec();
  // if(!user) throw new UnauthorizedException ('Invalid Credentials');

  // const valid = await bcrypt.compare(password, user.password);
  // if(!valid) throw new UnauthorizedException ('Invalid Credentials');
  // return user;

  //   }
}

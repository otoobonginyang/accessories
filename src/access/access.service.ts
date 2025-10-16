import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAccessDto } from './dto/create-access.dto';
import { UpdateAccessDto } from './dto/update-access.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Access } from './schema/access.schema';
import { Model } from 'mongoose';

@Injectable()
export class AccessService {
constructor(@InjectModel(Access.name)
private accessModel: Model<Access>) {}


 async create(createAccessDto: CreateAccessDto) {
   const access = new this.accessModel(createAccessDto);
   const savedAccess = await access.save();
   const { _id, brand, productname, color, price, instock } = savedAccess.toObject();
   return { access: { _id, brand, productname, color, price, instock }, message: 'New Accessory Created' };
 }



  async findAll() {
    const accessList = await this.accessModel.find().lean();
    return { access: accessList, message: 'All Accessories have been Found' };
  }

  async findOne(id: string) {
    const access = await this.accessModel.findById(id).lean();
    if (!access) throw new NotFoundException ('Accessory Not Found');
    return { access, message: 'Successfully Found Accessory' };
  }

  async update(id: string, updateAccessDto: UpdateAccessDto) {
    const access = await this.accessModel.findByIdAndUpdate(id, updateAccessDto, { new: true }).lean();
    if (!access) throw new NotFoundException ('Accessory Not Updated');
    return { access, message: 'Accessory Updated' };
  }
  

  async delete(id: string) {
    const access = await this.accessModel.findByIdAndDelete(id);
    if (!access) throw new NotFoundException ('Accessory Not Found');
    return { message: 'Accessory Deleted Successfully' };
  }

  
  }


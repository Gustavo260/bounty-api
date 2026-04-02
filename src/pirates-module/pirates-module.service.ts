import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { CreatePirateDto } from './dto/create-pirates-module.dto';
import { UpdatePirateDto } from './dto/update-pirates-module.dto';
import { Pirate, PirateDocument } from './schemas/pirate.schema';

@Injectable()
export class PiratesService {
  constructor(
    @InjectModel(Pirate.name)
    private readonly pirateModel: Model<PirateDocument>,
  ) {}

  async create(createPirateDto: CreatePirateDto): Promise<Pirate> {
    try {
      return await this.pirateModel.create(createPirateDto);
    } catch (error) {
      if (error?.code === 11000) {
        throw new ConflictException('Ya existe un pirata con ese nombre.');
      }
      throw error;
    }
  }

  async findAll(): Promise<Pirate[]> {
    return this.pirateModel.find().exec();
  }

  async findOne(id: string): Promise<Pirate> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('El id del pirata no es válido.');
    }

    const pirate = await this.pirateModel.findById(id).exec();

    if (!pirate) {
      throw new NotFoundException('Pirata no encontrado');
    }

    return pirate;
  }

  async update(id: string, updatePirateDto: UpdatePirateDto): Promise<Pirate> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('El id del pirata no es válido.');
    }

    const pirate = await this.pirateModel
      .findByIdAndUpdate(id, updatePirateDto, {
        new: true,
        runValidators: true,
      })
      .exec();

    if (!pirate) {
      throw new NotFoundException('Pirata no encontrado');
    }

    return pirate;
  }

  async remove(id: string): Promise<Pirate> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('El id del pirata no es válido.');
    }

    const pirate = await this.pirateModel.findByIdAndDelete(id).exec();

    if (!pirate) {
      throw new NotFoundException('Pirata no encontrado');
    }

    return pirate;
  }
}
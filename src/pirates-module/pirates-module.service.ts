import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

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
    return this.pirateModel.create(createPirateDto);
  }

  async findAll(): Promise<Pirate[]> {
    return this.pirateModel.find().exec();
  }

  async findOne(id: string): Promise<Pirate> {
    const pirate = await this.pirateModel.findById(id).exec();

    if (!pirate) {
      throw new NotFoundException('Pirata no encontrado');
    }

    return pirate;
  }

  async update(id: string, updatePirateDto: UpdatePirateDto): Promise<Pirate> {
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
    const pirate = await this.pirateModel.findByIdAndDelete(id).exec();

    if (!pirate) {
      throw new NotFoundException('Pirata no encontrado');
    }

    return pirate;
  }
}
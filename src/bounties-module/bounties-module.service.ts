import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateBountyDto } from './dto/create-bounties-module.dto';
import { UpdateBountyDto } from './dto/update-bounties-module.dto';
import { Bounty, BountyDocument } from './schemas/bounty.schema';

@Injectable()
export class BountiesService {
  constructor(
    @InjectModel(Bounty.name)
    private readonly bountyModel: Model<BountyDocument>,
  ) {}

  async create(createBountyDto: CreateBountyDto): Promise<Bounty> {
    return this.bountyModel.create(createBountyDto);
  }

  async findAll(): Promise<Bounty[]> {
    return this.bountyModel.find().populate('pirata').exec();
  }

  async findActive(): Promise<Bounty[]> {
    return this.bountyModel
      .find({ estado: 'Wanted' })
      .populate('pirata')
      .exec();
  }

  async findOne(id: string): Promise<Bounty> {
    const bounty = await this.bountyModel.findById(id).populate('pirata').exec();

    if (!bounty) {
      throw new NotFoundException('Recompensa no encontrada');
    }

    return bounty;
  }

  async update(id: string, updateBountyDto: UpdateBountyDto): Promise<Bounty> {
    const bounty = await this.bountyModel
      .findByIdAndUpdate(id, updateBountyDto, {
        new: true,
        runValidators: true,
      })
      .populate('pirata')
      .exec();

    if (!bounty) {
      throw new NotFoundException('Recompensa no encontrada');
    }

    return bounty;
  }

  async remove(id: string): Promise<Bounty> {
    const bounty = await this.bountyModel.findByIdAndDelete(id).exec();

    if (!bounty) {
      throw new NotFoundException('Recompensa no encontrada');
    }

    return bounty;
  }
}
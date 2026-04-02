import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Pirate } from '../../pirates-module/schemas/pirate.schema';

export type BountyDocument = HydratedDocument<Bounty>;

@Schema({ timestamps: true, versionKey: false })
export class Bounty {
  @Prop({ required: true, type: Number })
  cantidadBellys: number;

  @Prop({
    type: String,
    enum: ['Wanted', 'Captured'],
    default: 'Wanted',
  })
  estado: string;

  @Prop({ type: Types.ObjectId, ref: Pirate.name, required: true })
  pirata: Types.ObjectId;
}

export const BountySchema = SchemaFactory.createForClass(Bounty);
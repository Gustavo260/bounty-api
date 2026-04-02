import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PirateDocument = HydratedDocument<Pirate>;

@Schema({ timestamps: true, versionKey: false })
export class Pirate {
  @Prop({ required: true, unique: true })
  nombre: string;

  @Prop({ required: true })
  tripulacion: string;

  @Prop({ default: false, type: Boolean })
  tieneFrutaDelDiablo: boolean;
}

export const PirateSchema = SchemaFactory.createForClass(Pirate);
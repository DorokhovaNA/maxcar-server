import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type AdsDocument = Ad & Document;

@Schema()
export class Ad {
  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  date: string;

  @Prop({ required: true, default: '1' })
  userId: string;

  @Prop({ required: true })
  year: number;

  @Prop({ required: true })
  drive: string;

  @Prop({ required: true })
  transmission: string;

  @Prop({ required: true })
  modification: string;

  @Prop({ required: true })
  mileage: number;

  @Prop({ required: true })
  status: string;

  @Prop({ required: true })
  body: string;

  @Prop({ required: true })
  attachment?: string[];
}

export const AdsSchema = SchemaFactory.createForClass(Ad);

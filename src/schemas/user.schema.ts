import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
class UserDocument {
  @Prop({ required: true })
  companyEmail: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  companyName: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export type User = UserDocument & Document;

export const UserSchema = SchemaFactory.createForClass(UserDocument);

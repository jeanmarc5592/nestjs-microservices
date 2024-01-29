import { AbstractDocument } from '@app/common/database/abstract.schema';
import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false })
@ObjectType()
export class ReservationDocument extends AbstractDocument {
  @Prop()
  @Field()
  timestamp: Date;

  @Prop()
  @Field()
  startDate: Date;

  @Prop()
  @Field()
  endDate: Date;

  @Prop()
  @Field()
  userId: string;

  @Prop()
  @Field()
  invoiceId: string;
}

export const ReservationSchema =
  SchemaFactory.createForClass(ReservationDocument);

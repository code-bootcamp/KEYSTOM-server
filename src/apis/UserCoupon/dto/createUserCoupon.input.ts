import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateUserCouponInput {

  @Field(()=>String)
  userId:string;

  @Field(()=>String)
  couponId:string


}

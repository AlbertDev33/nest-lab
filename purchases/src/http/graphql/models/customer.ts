import { ObjectType, ID, Field, Directive } from '@nestjs/graphql';
import { Purchase } from './purchases';

@ObjectType('User')
@Directive('@key(fields: "authUserId")')
export class Customer {
  id: string;

  @Field(() => ID)
  authUserId: string;

  @Field(() => [Purchase])
  purchases: Purchase[];
}

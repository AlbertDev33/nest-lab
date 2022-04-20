import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateProducts {
  @Field()
  title: string;
}

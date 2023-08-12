import { InputType, Field } from '@nestjs/graphql';
import {MinLength} from "class-validator";

@InputType()
export class CreateOwnerInput {
  @MinLength(5)
  @Field()
  name: string;
}

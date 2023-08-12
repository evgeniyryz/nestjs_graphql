import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { OwnerService } from './owner.service';
import { Owner } from './entities/owner.entity';
import { CreateOwnerInput } from './dto/create-owner.input';
import { UpdateOwnerInput } from './dto/update-owner.input';
import {ParseIntPipe} from "@nestjs/common";
import {Pet} from "../pets/pet.entity";

@Resolver(() => Owner)
export class OwnerResolver {
  constructor(private readonly ownerService: OwnerService) {}

  @Mutation(() => Owner)
  createOwner(@Args('createOwnerInput') createOwnerInput: CreateOwnerInput) {
    return this.ownerService.create(createOwnerInput);
  }

  @Query(returns => [Owner])
  findAll() {
    return this.ownerService.findAll();
  }

  @Query(() => Owner, { name: 'owner' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.ownerService.findOne(id);
  }

  @Mutation(() => Owner)
  async updateOwner(
      @Args('id', ParseIntPipe) id: number,
      @Args('createOwnerInput') updateOwnerInput: UpdateOwnerInput
  ) {
    return this.ownerService.update(id, updateOwnerInput);
  }

  @Mutation(() => Owner)
  async removeOwner(
      @Args('id', ParseIntPipe) id: number,
  ) {
    return this.ownerService.remove(id);
  }
}

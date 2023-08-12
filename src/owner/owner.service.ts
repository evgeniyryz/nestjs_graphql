import {Injectable, ParseIntPipe} from '@nestjs/common';
import { CreateOwnerInput } from './dto/create-owner.input';
import { UpdateOwnerInput } from './dto/update-owner.input';
import {InjectRepository} from "@nestjs/typeorm";
import {Owner} from "./entities/owner.entity";
import {Repository} from "typeorm";
import {Args} from "@nestjs/graphql";
import {UserInputError} from "@nestjs/apollo";
import {Pet} from "../pets/pet.entity";

@Injectable()
export class OwnerService {
  constructor(@InjectRepository(Owner) private ownerRepository: Repository<Owner>) {}

  create(createOwnerInput: CreateOwnerInput): Promise<Owner> {
    const newOwner = this.ownerRepository.create(createOwnerInput);

    return this.ownerRepository.save(newOwner);
  }

  async findAll(): Promise<Owner[]> {
    return this.ownerRepository.find();
  }

  findOne(id: number): Promise<Owner> {
    return this.ownerRepository.findOneOrFail({where: {id: id}});
  }

  async update(
      id: number,
      updateOwnerInput: UpdateOwnerInput
  ): Promise<Owner> {
    const owner = await this.ownerRepository.preload({
      id,
      ...updateOwnerInput,
    });

    if (! owner) {
      throw new UserInputError(`Owner #$(id) does not exist`);
    }

    return this.ownerRepository.save(owner);
  }

  async remove(id: number) {
    const owner = await this.findOne(id);
    return this.ownerRepository.remove(owner);
  }
}

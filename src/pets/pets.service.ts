import { Injectable } from '@nestjs/common';
import { Pet } from './pet.entity';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {CreatePetInput} from "./dto/create-pet.input";
import {OwnerService} from "../owner/owner.service";
import {Owner} from "../owner/entities/owner.entity";

@Injectable()
export class PetsService {
  constructor(@InjectRepository(Pet) private petsRepository: Repository<Pet>, private ownerService: OwnerService ) {}

  createPet(createPetInput: CreatePetInput): Promise<Pet> {
    const newPet = this.petsRepository.create(createPetInput);

    return this.petsRepository.save(newPet);
  }

  async findAll(): Promise<Pet[]> {
    return this.petsRepository.find();
  }

  findOne(id: number): Promise<Pet> {
    return this.petsRepository.findOneOrFail({where: {id: id}});
  }

  getOwner(ownerId: number): Promise<Owner> {
    return this.ownerService.findOne(ownerId);
  }
}

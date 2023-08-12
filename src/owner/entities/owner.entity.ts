import {ObjectType, Field, Int, Float} from '@nestjs/graphql';
import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Pet} from "../../pets/pet.entity";

@Entity()
@ObjectType()
export class Owner {
  @PrimaryGeneratedColumn()
  @Field(type => Float)
  id: number;

  @Column()
  @Field()
  name: string;

  @OneToMany(() => Pet, pet => pet.owner)
  @Field(type => [Pet], {nullable: true} )
  pets?: Pet[]
}

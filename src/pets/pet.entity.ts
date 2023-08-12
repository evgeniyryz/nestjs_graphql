import {Field, Float, Int, ObjectType} from '@nestjs/graphql';
import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Owner} from "../owner/entities/owner.entity";

@Entity()
@ObjectType()
export class Pet {
  @PrimaryGeneratedColumn()
  @Field(type => Float)
  id: number;

  @Column()
  @Field()
  name: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  type?: string;

  @Column()
  @Field(type => Int)
  ownerId: number;

  @ManyToOne(() => Owner, owner => owner.pets)
  @Field(type => Owner)
  owner: Owner;
}

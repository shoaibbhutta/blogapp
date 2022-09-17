import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';

import { Post } from './post.model';
@ObjectType()
@Entity('postMedia')
export class PostMedia {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Field()
  @Column()
  mediaUrl: string;

  @Field(() => Post)
  @ManyToOne(() => Post, (post) => post.postMedia)
  post: Post;
  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;
  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;
}

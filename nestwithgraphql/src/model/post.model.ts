import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';

import { User } from './user.model';
import { PostMedia } from './postMedia.model';
import { Comment } from './comment.model';
@ObjectType()
@Entity('posts')
export class Post {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Field({ nullable: true })
  @Column({ nullable: true })
  description: string;
  @Field(() => [PostMedia], { nullable: 'items' })
  @OneToMany(() => PostMedia, (postMedia) => postMedia.post)
  postMedia: PostMedia[];
  @Field(() => [Comment], { nullable: 'items' })
  @OneToMany(() => Comment, (comment) => comment.post, { eager: true })
  comments: Comment[];

  @Field(() => User)
  @ManyToOne(() => User)
  user: User;
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

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { Expose } from 'class-transformer';

import { Role } from './role.model';
import { Post } from './post.model';
import { Comment } from './comment.model';
@ObjectType()
@Entity('users')
export class User {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Field()
  @Column()
  firstName: string;
  @Field()
  @Column()
  email: string;
  @Field()
  @Column()
  lastName: string;
  @Field()
  @Column()
  dateOfBirth: Date;

  @Field({ nullable: true })
  @Column({ nullable: true })
  bio: string;
  @Column({ nullable: true })
  profileImageUrl: string;

  @Field()
  @Column()
  password: string;

  @Field(() => Role, { nullable: true })
  @ManyToOne(() => Role, (role) => role.user, { eager: true })
  @JoinColumn()
  role?: Role;

  @Field(() => [Post], { nullable: true })
  @OneToMany(() => Post, (post) => post.user)
  Post: Post[];

  @Field(() => [Comment], { nullable: true })
  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];
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
  @Field()
  @Expose()
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}

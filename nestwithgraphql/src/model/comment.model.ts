import { Post } from './post.model';
import { User } from './user.model';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
@ObjectType()
@Entity('comments')
export class Comment {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  comment: string;
  // @Column()
  // PostId: number;
  @Field(() => User)
  @ManyToOne(() => User, (user) => user.comments)
  user: User;
  @Field(() => Post)
  @ManyToOne(() => Post, (Post) => Post.comments)
  post: Post;

  @Field(() => [Comment], { nullable: 'items' })
  @OneToMany(() => Comment, (comment) => comment.parent, {
    nullable: true,
  })
  children: Comment[];

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  parentId: string;
  @Field(() => Comment, { nullable: true })
  @ManyToOne(() => Comment, (comment) => comment.children)
  @JoinColumn({ name: 'parentId' })
  parent: Comment;

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

//  public id!: number; // Note that the `null assertion` `!` is required in strict mode.
//   public comment!: string;
//   rootId!: number;
//   PostId!: number;
//   public readonly createdAt!: Date;
//   public readonly updatedAt!: Date;
//   public Comments?: Comment[];

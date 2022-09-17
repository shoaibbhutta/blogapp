import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  // JoinColumn,
} from 'typeorm';
import { User } from './user.model';
import { PostMedia } from './postMedia.model';
import { Comment } from './comment.model';
@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: true })
  description: string;
  @OneToMany(() => PostMedia, (postMedia) => postMedia.Post)
  // @JoinColumn()
  PostMedia: PostMedia[];
  @OneToMany(() => Comment, (comment) => comment.Post, { eager: true })
  comments: Comment[];
  @ManyToOne(() => User)
  User: User;
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

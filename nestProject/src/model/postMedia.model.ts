import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Post } from './post.model';
@Entity('postMedia')
export class PostMedia {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  mediaUrl: string;

  @ManyToOne(() => Post, (post) => post.PostMedia)
  Post: Post;
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

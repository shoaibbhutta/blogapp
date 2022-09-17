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

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  comment: string;
  // @Column()
  // PostId: number;
  @ManyToOne(() => User, (user) => user.Comments)
  User: User;

  @ManyToOne(() => Post, (Post) => Post.comments)
  Post: Post;
  // @ManyToOne((type) => Service, (service) => service.children)
  // parent: Service;

  // @OneToMany((type) => Service, (service) => service.parent)
  // children: Service[];

  @OneToMany(() => Comment, (comment) => comment.parent, {
    nullable: true,
  })
  children: Comment[];

  @Column({ nullable: true })
  parentId: number;

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

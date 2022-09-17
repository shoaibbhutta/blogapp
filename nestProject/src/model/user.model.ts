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
import { Role } from './role.model';
import { Post } from './post.model';
import { Comment } from './comment.model';
@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;
  @Column()
  email: string;
  @Column()
  lastName: string;
  @Column()
  date_of_birth: Date;
  @Column({ nullable: true })
  bio: string;
  @Column({ nullable: true })
  profileImageUrl: string;

  @Column()
  password: string;

  @ManyToOne(() => Role, (role) => role.user, { eager: true })
  @JoinColumn()
  Role?: Role;

  @OneToMany(() => Post, (post) => post.User)
  Post: Post[];

  @OneToMany(() => Comment, (comment) => comment.User)
  Comments: Comment[];
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

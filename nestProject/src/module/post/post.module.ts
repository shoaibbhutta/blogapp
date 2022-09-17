import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';

import { PostService } from './post.service';
import { User } from '../../model/user.model';
import { Post } from '../../model/post.model';
import { Comment } from '../../model/comment.model';
import { PostController } from './post.controller';
import { PostMedia } from 'src/model/postMedia.model';
import { PostMediaModule } from '../post-media/post-media.module';
import { UserModule } from '../user/user.module';
@Module({
  providers: [PostService],
  imports: [
    TypeOrmModule.forFeature([User, Post, Comment, PostMedia]),

    MulterModule.register(),
    PostMediaModule,
    UserModule,
  ],
  exports: [PostService],
  controllers: [PostController],
})
export class PostModule {}

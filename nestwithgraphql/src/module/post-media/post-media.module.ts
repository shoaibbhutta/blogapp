import { Module } from '@nestjs/common';
import { PostMediaService } from './post-media.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostMedia } from 'src/model/postMedia.model';
import { Post } from 'src/model/post.model';
import { PostMediaController } from './post-media.controller';

import { PostModule } from '../post/post.module';
@Module({
  imports: [TypeOrmModule.forFeature([PostMedia, Post]), PostModule],
  providers: [PostMediaService],
  exports: [PostMediaService],
  controllers: [PostMediaController],
})
export class PostMediaModule {}

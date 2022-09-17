import { Module } from '@nestjs/common';
import { PostMediaService } from './post-media.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostMedia } from 'src/model/postMedia.model';
import { PostMediaController } from './post-media.controller';
@Module({
  imports: [TypeOrmModule.forFeature([PostMedia])],
  providers: [PostMediaService],
  exports: [PostMediaService],
  controllers: [PostMediaController],
})
export class PostMediaModule {}

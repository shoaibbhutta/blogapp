import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Comment } from '../../model/comment.model';
// import { PostService } from '../post/post.service';
import { PostModule } from '../post/post.module';
import { UserModule } from '../user/user.module';
import { CommentController } from './comment.controller';
@Module({
  providers: [CommentService],
  imports: [
    TypeOrmModule.forFeature([Comment]),
    PostModule,
    PostModule,
    UserModule,
  ],
  controllers: [CommentController],
})
export class CommentModule {}

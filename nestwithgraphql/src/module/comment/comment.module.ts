import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Comment } from '../../model/comment.model';
// import { PostService } from '../post/post.service';
import { PostModule } from '../post/post.module';
import { UserModule } from '../user/user.module';
import { CommentResolver } from './comment.resolver';
import { ElasticSearchModule } from '../elastic-search/elastic-search.module';
import { ElasticSearchService } from '../elastic-search/elastic-search.service';

@Module({
  providers: [CommentService, CommentResolver, ElasticSearchService],
  imports: [
    TypeOrmModule.forFeature([Comment]),
    PostModule,
    PostModule,
    UserModule,
    ElasticSearchModule,
  ],
})
export class CommentModule {}

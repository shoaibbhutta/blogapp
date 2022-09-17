import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';

import { PostService } from './post.service';
import { User } from '../../model/user.model';
import { Post } from '../../model/post.model';
import { Comment } from '../../model/comment.model';
import { PostMedia } from 'src/model/postMedia.model';
import { UserModule } from '../user/user.module';
import { PostResolver } from './post.resolver';

import { ElasticSearchModule } from '../elastic-search/elastic-search.module';
import { ElasticSearchService } from '../elastic-search/elastic-search.service';
@Module({
  providers: [PostService, PostResolver, ElasticSearchService],
  imports: [
    TypeOrmModule.forFeature([User, Post, Comment, PostMedia]),

    MulterModule.register(),
    UserModule,
    ElasticSearchModule,
  ],
  exports: [PostService],
})
export class PostModule {}

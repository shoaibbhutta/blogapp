import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Comment } from 'src/model/comment.model';
import { PostService } from '../post/post.service';
import { UserService } from '../user/user.service';
// import { ElasticSearchService } from '../elastic-search/elastic-search.service';
@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly CommentModel: Repository<Comment>,
    private readonly Post: PostService,
    private readonly UsersService: UserService,
  ) {}
  async findCommentById(commentId: string) {
    try {
      return await this.CommentModel.findOne({ id: commentId });
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
  async addComment(body: CrateCommentInterface) {
    try {
      const post = await this.Post.getPostById(body.postId);
      if (!post) {
        throw new BadRequestException('no post with this id found');
      }
      const User = await this.UsersService.findOne({ id: body.userId });

      const commentBody = {
        Post: post,
        comment: body.comment,
        User,
        parentId: body.parentId,
      };
      const comment = this.CommentModel.create(commentBody);
      await this.CommentModel.insert(comment);
      return await this.Post.getPostById(body.postId);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}

interface CrateCommentInterface {
  parentId: string | null;
  comment: string;
  postId: string;
  userId: string;
}

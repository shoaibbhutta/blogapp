import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Comment } from 'src/model/comment.model';
import { PostService } from '../post/post.service';
import { UserService } from '../user/user.service';
@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly CommentModel: Repository<Comment>,
    private readonly Post: PostService,
    private readonly UsersService: UserService,
  ) {}
  async findCommentById(commentId: number) {
    return await this.CommentModel.findOne({ id: commentId });
  }
  async addComment(body: CrateCommentInterface) {
    const post = await this.Post.getPostById(body.postId);
    if (!post) {
      throw new BadRequestException('no post with this id found');
    }
    const User = await this.UsersService.findOne({ id: body.userId });
    // let Comments = null;
    // if (body.parentId) {
    //   Comments = await this.findCommentById(body.parentId);
    // }
    const commentBody = {
      Post: post,
      comment: body.comment,
      User,
      parentId: body.parentId,
    };
    const comment = this.CommentModel.create(commentBody);
    await this.CommentModel.insert(comment);
    return await this.Post.getPostById(body.postId);
  }
}

interface CrateCommentInterface {
  parentId: number | null;
  comment: string;
  postId: number;
  userId: number;
}

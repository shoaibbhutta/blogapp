import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/core/guards/gql-auth-guard';
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import {
  CurrentUser,
  LoggedInUserInterface,
} from 'src/core/customDecorators/getCurrentUserDecorator';
import { CommentService } from './comment.service';
import { Post } from 'src/model/post.model';
import { ObjectType, Field, InputType } from '@nestjs/graphql';
// import { PostMedia } from 'src/model/postMedia.model';
import { AddCommentResponse } from './interface/comment.interface';
@InputType()
class AddCommmentBody {
  @Field()
  comment: string;
  @Field(() => String, { nullable: true })
  commentsId: null | string;

  @Field(() => String)
  postId: string;
}

@ObjectType()
export class AddCommentResponseGql {
  @Field(() => Post)
  post: Post;
}

@Resolver()
export class CommentResolver {
  constructor(private readonly commentService: CommentService) {}
  @Mutation(() => AddCommentResponseGql)
  @UseGuards(GqlAuthGuard)
  async addPostComment(
    @Args('body')
    body: AddCommmentBody,
    @CurrentUser() user: LoggedInUserInterface,
  ): Promise<AddCommentResponse> {
    const data = {
      userId: user.loggedInUser.id,
      comment: body.comment,
      postId: body.postId,
      parentId: body.commentsId,
    };
    const post = await this.commentService.addComment(data);
    return { post };
  }
}

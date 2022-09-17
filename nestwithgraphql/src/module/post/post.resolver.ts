import { UseGuards } from '@nestjs/common';
import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/core/guards/gql-auth-guard';
import {
  CurrentUser,
  LoggedInUserInterface,
} from 'src/core/customDecorators/getCurrentUserDecorator';
import { CreatePostDto, UpdatePostDto } from './dto/createPostDto';
import { PostService } from './post.service';

import {
  GetPostsResponse,
  DeletePostResponse,
  PostResponse,
} from './interface/post.interface';
import {
  GetPostsResponseGql,
  GetPostResponseGql,
  DeletePostResponseGql,
  SearchPostResponse,
} from './output/output';

@Resolver()
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Query(() => GetPostsResponseGql)
  @UseGuards(GqlAuthGuard)
  async getPosts(
    @Args('limit') limit: number,
    @Args('page') page: number,
  ): Promise<GetPostsResponse> {
    return await this.postService.getPosts(page ? page : 1, limit ? limit : 10);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => GetPostResponseGql)
  async createPost(
    @Args('body') body: CreatePostDto,
    @CurrentUser() user: LoggedInUserInterface,
  ): Promise<PostResponse> {
    const post = await this.postService.createPost(body, user.loggedInUser);
    return { post };
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => GetPostResponseGql)
  async updatePost(
    @Args('body') body: UpdatePostDto,
    @CurrentUser() user: LoggedInUserInterface,
  ): Promise<PostResponse> {
    const post = await this.postService.updatePost(
      user.loggedInUser.id,
      body.postId,
      body.description,
    );
    return { post };
  }
  @UseGuards(GqlAuthGuard)
  @Mutation(() => DeletePostResponseGql)
  async deletePost(
    @Args('postId') postId: string,
    @CurrentUser() user: LoggedInUserInterface,
  ): Promise<DeletePostResponse> {
    const message = await this.postService.deletePost(
      user.loggedInUser.id,
      postId,
    );
    return { message };
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => [SearchPostResponse])
  async searchPostUsingDescription(
    @Args('description') description: string,
  ): Promise<SearchPostResponse[]> {
    const response = await this.postService.searchPostUsingDescription(
      description,
    );
    return response;
  }
}

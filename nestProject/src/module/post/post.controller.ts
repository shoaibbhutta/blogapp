import {
  Controller,
  Body,
  UseGuards,
  Get,
  Request,
  Post,
  UseInterceptors,
  UploadedFiles,
  Param,
  Delete,
  Query,
  Put,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/core/guards/jwt-auth.guard';

import { createPostDto } from './dto/createPostDto';
import { PostService } from './post.service';
import { Post as PostModel } from 'src/model/post.model';
import { FilesInterceptor } from '@nestjs/platform-express/multer';
import { fileFilter, fileStorage } from '../../utils/imageUpload';
import { getPostsResponse } from './interface/post.interface';

@Controller()
export class PostController {
  constructor(private readonly postService: PostService) {}

  // getPost file
  @UseGuards(JwtAuthGuard)
  @Get('fetchPosts')
  async getPosts(
    @Query('page') page: number,
    @Query('limit') limit: number,
  ): Promise<getPostsResponse> {
    console.log('=====================>>>>', page, limit);

    return await this.postService.getPosts(page ? page : 1, limit ? limit : 10);
  }

  @UseGuards(JwtAuthGuard)
  @Post('createPost')
  @UseInterceptors(
    FilesInterceptor('images[]', 20, {
      dest: './images',
      fileFilter: fileFilter,
      storage: fileStorage,
    }),
  )
  async createPost(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Request() req,
    @Body() body: createPostDto,
  ): Promise<PostModel> {
    return await this.postService.createPost(body, req.user.userId, files);
  }

  @UseGuards(JwtAuthGuard)
  @Put('editPost/:postId')
  @UseInterceptors(
    FilesInterceptor('images[]', 20, {
      dest: './images',
      fileFilter: fileFilter,
      storage: fileStorage,
    }),
  )
  async updatePost(
    @Param('postId') postId: number,
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Request() req,
    @Body() body: createPostDto,
  ): Promise<PostModel> {
    return await this.postService.updatePost(
      req.user.userId,
      postId,
      body.description,

      files,
    );
  }
  @UseGuards(JwtAuthGuard)
  @Delete('deletePost/:postId')
  async deletePost(
    @Param('postId') postId: number,
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Request() req,
  ): Promise<string> {
    return await this.postService.deletePost(req.user.userId, postId);
  }
}

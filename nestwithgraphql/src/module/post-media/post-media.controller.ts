import {
  Controller,
  UseGuards,
  Delete,
  Param,
  Post,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/core/guards/jwt-auth.guard';

import { PostMediaService } from './post-media.service';
// import { PostMedia } from 'src/model/postMedia.model';
import { Post as PostModel } from 'src/model/post.model';
import { fileFilter, fileStorage } from '../../utils/imageUpload';
@Controller()
export class PostMediaController {
  constructor(private readonly postMediaService: PostMediaService) {}

  @UseGuards(JwtAuthGuard)
  @Delete('deletePostImage:postMediaId')
  async deletePostImage(
    @Param('postMediaId') postMediaId: string,
  ): Promise<void> {
    return await this.postMediaService.deletePostMedia(postMediaId);
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
  async addPostImage(
    @Param('postId') postId: string,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ): Promise<PostModel> {
    return await this.postMediaService.createPostMedia(postId, files);
  }
}

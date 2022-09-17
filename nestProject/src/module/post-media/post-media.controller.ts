import { Controller, UseGuards, Delete, Param } from '@nestjs/common';
import { JwtAuthGuard } from 'src/core/guards/jwt-auth.guard';

import { PostMediaService } from './post-media.service';
// import { PostMedia } from 'src/model/postMedia.model';

@Controller()
export class PostMediaController {
  constructor(private readonly postMediaService: PostMediaService) {}

  @UseGuards(JwtAuthGuard)
  @Delete('deletePostImage:postMediaId')
  async deletePostImage(
    @Param('postMediaId') postMediaId: number,
  ): Promise<void> {
    return await this.postMediaService.deletePostMedia(postMediaId);
  }
}

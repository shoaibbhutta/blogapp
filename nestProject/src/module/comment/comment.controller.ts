import {
  Controller,
  UseGuards,
  Post,
  Param,
  Request,
  Body,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/core/guards/jwt-auth.guard';

import { CommentService } from './comment.service';
// import { PostMedia } from 'src/model/postMedia.model';

@Controller('comment')
export class CommentController {
  constructor(private readonly postMediaService: CommentService) {}

  @UseGuards(JwtAuthGuard)
  @Post('addComment/:postId')
  async deletePostImage(
    @Param('postId') postId: number,
    @Request() req,
    @Body() body: { comment: string; commentsId: null | number },
  ) {
    const data = {
      userId: parseInt(req.user.userId),
      comment: body.comment,
      postId,
      parentId: body.commentsId,
    };
    return await this.postMediaService.addComment(data);
  }
}

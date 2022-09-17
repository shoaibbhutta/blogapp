import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PostMedia } from 'src/model/postMedia.model';
import { deleteFile } from '../../utils/imageDelete';
import { Post } from '../../model/post.model';

interface createPostMediaPayload {
  mediaUrl: string;
  Post: Post;
}
@Injectable()
export class PostMediaService {
  constructor(
    @InjectRepository(PostMedia)
    private readonly PostMediaModel: Repository<PostMedia>,
  ) {}
  async getPostMediaById(postMediaId: number): Promise<PostMedia | undefined> {
    return await this.PostMediaModel.findOne({ id: postMediaId });
  }
  async createPostMedia(body: createPostMediaPayload[]) {
    const postMedia = this.PostMediaModel.create(body);
    return await this.PostMediaModel.insert(postMedia);
  }

  async deletePostMedia(postMediaId: number) {
    const media = await this.getPostMediaById(postMediaId);
    if (!media) {
      throw new BadRequestException('no media file');
    }
    await this.PostMediaModel.delete({ id: postMediaId });
    deleteFile(media.mediaUrl);
  }
}

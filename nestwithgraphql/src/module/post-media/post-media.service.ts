import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PostMedia } from 'src/model/postMedia.model';
import { deleteFile } from '../../utils/imageDelete';
// import { Post } from '../../model/post.model';
import { PostService } from '../post/post.service';

@Injectable()
export class PostMediaService {
  constructor(
    @InjectRepository(PostMedia)
    private readonly PostMediaModel: Repository<PostMedia>,
    private readonly postService: PostService,
  ) {}
  async getPostMediaById(postMediaId: string): Promise<PostMedia | undefined> {
    try {
      return await this.PostMediaModel.findOne({ id: postMediaId });
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
  async createPostMedia(postId: string, files: Array<Express.Multer.File>) {
    try {
      if (files) {
        const postMedia = [];
        const post = await this.postService.getPostById(postId);
        for (const file of files) {
          postMedia.push({
            Post: post,
            mediaUrl: file.path,
          });
        }
        const media = this.PostMediaModel.create(postMedia);
        this.PostMediaModel.insert(media);
        return await this.postService.getPostById(postId);
      }
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
  async deletePostMedia(postMediaId: string) {
    try {
      const media = await this.getPostMediaById(postMediaId);
      if (!media) {
        throw new BadRequestException('no media file');
      }
      await this.PostMediaModel.delete({ id: postMediaId });
      deleteFile(media.mediaUrl);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
  // addMediaToExistingPost = async (
  //   files: Array<Express.Multer.File>,
  //   postId,
  // ): Promise<Post> => {
  //   const post = await this.getPostById(postId);
  //   if (!post) {
  //     throw new BadRequestException('no post with this id found');
  //   }
  //   const postMedia = [];
  //   for (const file of files) {
  //     postMedia.push({
  //       postId: postId,
  //       mediaUrl: file.path,
  //     });
  //     await this.PostMedia.createPostMedia(postMedia);
  //   }

  //   return await this.getPostById(postId);
  // };
}

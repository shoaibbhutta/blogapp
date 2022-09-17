import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/model/post.model';
import { Repository } from 'typeorm';
import { createPostDto } from './dto/createPostDto';
import { PostMediaService } from '../post-media/post-media.service';
import { deleteFile } from '../../utils/imageDelete';
import { getPostsResponse } from './interface/post.interface';
import { UserService } from '../user/user.service';
@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly PostModel: Repository<Post>,
    private readonly PostMedia: PostMediaService,
    private readonly UserServices: UserService,
  ) {}

  async getPosts(page = 1, limit = 10): Promise<getPostsResponse> {
    try {
      const skip = (page - 1) * limit;
      console.log(page, limit);
      const postQuery = this.PostModel.createQueryBuilder('post')
        .leftJoinAndSelect('post.User', 'user')
        .leftJoinAndSelect('post.PostMedia', 'media')
        .leftJoinAndSelect(
          'post.comments',
          'comments',
          'comments.parentId IS NULL',
        )
        .leftJoinAndSelect('comments.children', 'children')
        .leftJoinAndSelect('comments.User', 'commentedBy')
        .leftJoinAndSelect('children.User', 'repliedBy')
        .leftJoinAndSelect('children.children', 'subchild')
        .leftJoinAndSelect('subchild.User', 'subchildUser')
        .take(limit)
        .orderBy('post.id', 'DESC')
        .skip(skip ? skip : 0);

      const result = await postQuery.getMany();

      const count = await this.PostModel.count();
      // const [result, total] = await this.PostModel.find();
      //   relations: [
      //     'User',
      //     'PostMedia',
      //     'comments',
      //     'comments.Comments',
      //     'comments.User',
      //     'comments.Comments.User',
      //   ],
      // take: limit,

      // skip: (page - 1) * limit,
      // order: {
      //   id: 'DESC',
      // },
      // });

      // const result = await this.PostModel.find();
      return { count, posts: result };
    } catch (e) {
      console.log(e);
    }
  }

  async getPostById(id: number): Promise<Post> {
    return await this.PostModel.findOne(
      { id: id },
      { relations: ['User', 'PostMedia', 'comments'] },
    );
  }

  async createPost(
    body: createPostDto,
    userId: number,
    files: Array<Express.Multer.File> | undefined,
  ): Promise<Post> {
    const user = await this.UserServices.findOne({ id: userId });
    const post = { ...body, User: user };
    // console.log('==================>>>', userId);
    const newPost = this.PostModel.create(post);
    await this.PostModel.insert(newPost);
    if (files) {
      const postMedia = [];

      for (const file of files) {
        postMedia.push({
          Post: newPost,
          mediaUrl: file.path,
        });
        await this.PostMedia.createPostMedia(postMedia);
      }
    }
    return await this.getPostById(newPost.id);
  }

  async updatePost(
    loggedInUserId: number,
    postId: number,
    description: string,
    files: Array<Express.Multer.File> | undefined,
  ): Promise<Post> {
    const post = await this.getPostById(postId);
    if (!post) {
      throw new BadRequestException('no post with this id found');
    }
    if (post.User.id !== loggedInUserId) {
      throw new BadRequestException('only orignal creators can modify post');
    }
    await this.PostModel.update(
      { id: postId },
      {
        description: description,
      },
    );

    if (files) {
      const postMedia = [];

      for (const file of files) {
        postMedia.push({
          Post: post,
          mediaUrl: file.path,
        });
        await this.PostMedia.createPostMedia(postMedia);
      }
    }
    return await this.getPostById(postId);
  }

  async deletePost(loggedInUserId: number, postId: number): Promise<string> {
    const post = await this.getPostById(postId);
    if (!post) {
      throw new BadRequestException('no post with this id found');
    }
    if (post.User.id !== loggedInUserId) {
      throw new BadRequestException('creators can delete the post only');
    }
    await this.PostModel.delete({ id: postId });
    if (post.PostMedia.length !== 0) {
      for (const media of post.PostMedia) {
        deleteFile(media.mediaUrl);
      }
    }
    return 'post deleted successfully';
  }

  addMediaToExistingPost = async (
    files: Array<Express.Multer.File>,
    postId,
  ): Promise<Post> => {
    const post = await this.getPostById(postId);
    if (!post) {
      throw new BadRequestException('no post with this id found');
    }
    const postMedia = [];
    for (const file of files) {
      postMedia.push({
        postId: postId,
        mediaUrl: file.path,
      });
      await this.PostMedia.createPostMedia(postMedia);
    }

    return await this.getPostById(postId);
  };
}

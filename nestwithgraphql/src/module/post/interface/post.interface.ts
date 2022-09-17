import { Post } from 'src/model/post.model';

export interface GetPostsResponse {
  posts: Post[];
  count: number;
}

export interface PostResponse {
  post: Post;
}

export interface DeletePostResponse {
  message: string;
}

export interface SearchPostResponse {
  _index: string;

  _type: string;

  _id: string;

  _score: unknown;

  _source: unknown;
}

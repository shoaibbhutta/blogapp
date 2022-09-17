import { Post } from 'src/model/post.model';
export interface getPostsResponse {
  posts: Post[];
  count: number;
}

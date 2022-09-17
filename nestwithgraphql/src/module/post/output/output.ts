import { Post } from 'src/model/post.model';
import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class GetPostsResponseGql {
  @Field(() => [Post], { nullable: 'items' })
  posts: Post[];
  @Field()
  count: number;
}

@ObjectType()
export class GetPostResponseGql {
  @Field(() => Post, { nullable: true })
  post: Post;
}

@ObjectType()
export class DeletePostResponseGql {
  @Field()
  message: string;
}

@ObjectType()
class SourceInterface {
  @Field()
  description: string;
}
@ObjectType()
export class SearchPostResponse {
  @Field()
  _index: string;
  @Field()
  _type: string;
  @Field()
  _id: string;
  @Field(() => Int)
  _score: unknown;
  @Field(() => SourceInterface)
  _source: unknown;
}

import "reflect-metadata";

import {
  Query,
  Resolver,
  Mutation,
  Arg,
  ObjectType,
  Field,
  UseMiddleware,
  InputType,
  Ctx,
} from "type-graphql";
import { isAuth } from "../../utils/auth";
import { MyContext } from "../../interfaces/context";
import User from "../../model/User.model";
import Comment from "../../model/Comment.model";
import Post from "../../model/Post.model";
import PostMedia from "../../model/PostMedia.model";

@ObjectType()
class CommentResponse {
  @Field(() => Post, { nullable: true })
  post?: Post;
  @Field(() => [Comment], { nullable: true })
  Comments?: Comment[];
  @Field(() => String, { nullable: true })
  message?: string;
}

// input for creating the post
@InputType()
export class createCommentBody {
  @Field()
  comment!: string;
  @Field(() => Number, { nullable: true })
  rootId?: number | null;
  @Field(() => Number)
  postId!: number;
}

@Resolver()
export class CommentResolver {
  @Query(() => CommentResponse)
  @UseMiddleware(isAuth)
  async getComments(): Promise<CommentResponse> {
    try {
      const commments: Comment[] = await Comment.findAll({
        where: {
          CommentId: null,
        },
        include: [
          {
            model: User,
            attributes: [
              "id",
              "firstName",
              "lastName",
              "email",
              "profileImageUrl",
              "RoleId",
            ],
          },
          {
            model: Comment,

            include: [
              {
                model: User,
                attributes: [
                  "id",
                  "firstName",
                  "lastName",
                  "email",
                  "profileImageUrl",
                  "RoleId",
                ],
              },
            ],
          },
        ],
      });
      return { Comments: commments };
    } catch (e) {
      return { message: "something went wrong in postAddRole" };
      console.trace(e);
    }
  }

  @Mutation(() => CommentResponse)
  @UseMiddleware(isAuth)
  async createComment(
    @Arg("createCommentBody") body: createCommentBody,
    @Ctx() { req }: MyContext
  ): Promise<CommentResponse> {
    try {
      const post: Post | null = await Post.findByPk(body.postId, {
        include: [
          {
            model: User,

            attributes: [
              "id",
              "firstName",
              "lastName",
              "email",
              "profileImageUrl",
              "RoleId",
            ],
          },
          { model: PostMedia },
          {
            model: Comment,

            include: [
              {
                model: User,

                attributes: [
                  "id",
                  "firstName",
                  "lastName",
                  "email",
                  "profileImageUrl",
                  "RoleId",
                ],
              },
              {
                model: Comment,

                include: [
                  {
                    model: Comment,
                    include: [
                      {
                        model: User,

                        attributes: [
                          "id",
                          "firstName",
                          "lastName",
                          "email",
                          "profileImageUrl",
                          "RoleId",
                        ],
                      },
                    ],
                  },
                  {
                    model: User,

                    attributes: [
                      "id",
                      "firstName",
                      "lastName",
                      "email",
                      "profileImageUrl",
                      "RoleId",
                    ],
                  },
                ],
              },
            ],
          },
        ],
      });
      if (!post) {
        return { message: "Post does not found" };
      }

      const comment: Comment = new Comment({
        CommentId: body.rootId || null,
        comment: body.comment,
        PostId: body.postId,
        UserId: req.userId,
      });

      await comment.save();

      await post.reload();
      return { post };
    } catch (e) {
      return { message: "something went wrong in createPost" };
      console.trace(e);
    }
  }
}

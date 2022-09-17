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
// import Role from "../../model/Role.model";
import User from "../../model/User.model";
import Comment from "../../model/Comment.model";
import Post from "../../model/Post.model";
import PostMedia from "../../model/PostMedia.model";
import { Stream } from "stream";
import { deleteFile } from "../../utils/imageDelete";
@ObjectType()
class PostResponse {
  @Field(() => Post, { nullable: true })
  post?: Post;

  @Field(() => String, { nullable: true })
  message?: string;

}
@ObjectType()
class PostsResponse {
  @Field(() => [Post])
  posts!: Post[];
  @Field(() => Number)
  count!: number;
}
// input for creating the post
@InputType()
export class createPostBody {
  @Field()
  description!: string;
}

@Resolver()
export class PostResolver {
  @Query(() => PostsResponse)
  @UseMiddleware(isAuth)
  async getPosts(
    @Arg("limit") limit: number = 10,
    @Arg("page") page: number = 1
  ): Promise<PostsResponse> {
    try {
      const posts: Post[] = await Post.findAll({
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
            // where: {
            //   CommentId: null,
            // },
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

        offset: (page - 1) * limit,
        limit: limit,
        order: [["createdAt", "DESC"]],
      });

      // const totalPosts = await Post.findAndCountAll();
      const count = await Post.count({
        distinct: true,
        col: "id",
      });
      // console.log("=======================>", posts);p
      const pages = Math.ceil(count / limit);

      return { posts, count: pages };
    } catch (e) {
      console.trace(e);
      // return { message: "something went wrong in postAddRole" };
      throw new Error("some thing went wront at fetch posts");
    }
  }

  @Mutation(() => PostResponse)
  @UseMiddleware(isAuth)
  async createPost(
    @Arg("createPostBody") body: createPostBody,
    @Ctx() { req }: MyContext
  ): Promise<PostResponse> {
    try {
      let post: Post = await Post.create({
        description: body.description,
        UserId: req.userId,
      });

      let createdPost: Post | null = await Post.findByPk(post.id, {
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
      });
      if (createdPost) {
        return { post: createdPost };
      } else {
        return { message: "Post creation failed" };
      }
    } catch (e) {
      return { message: "something went wrong in createPost" };
      console.trace(e);
    }
  }

  @Mutation(() => PostResponse)
  @UseMiddleware(isAuth)
  async editPost(
    @Arg("id") id: number,
    @Arg("editPostBody") body: createPostBody,
    @Ctx() { req }: MyContext
  ): Promise<PostResponse> {
    try {
      const post: Post | null = await Post.findByPk(id, {
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

      if (req.userId !== post.UserId) {
        return { message: "Only orignal creator can delete the post" };
      }

      post.description = body.description;
      await post.save();
      await post.reload();
      return { post };
    } catch (e) {
      return { message: "something went wrong in createPost" };
      console.trace(e);
    }
  }
  @Mutation(() => PostResponse)
  @UseMiddleware(isAuth)
  async deletePost(
    @Arg("id") id: number,
    @Ctx() { req }: MyContext
  ): Promise<PostResponse> {
    try {
      const post: Post | null = await Post.findByPk(id, {
        include: [{ model: PostMedia }],
      });
      if (!post) {
        return { message: "Post does not found" };
      }

      if (req.userId !== post.UserId) {
        return { message: "Only orignal creator can delete the post" };
      }
      await Post.destroy({
        where: { id: id },
      });

      for (let postMedia of post.PostMedia) {
        deleteFile(postMedia.mediaUrl);
      }
      return {
        message: "image deleted successfully",
      };
    } catch (e) {
      return { message: "something went wrong in createPost" };
      console.trace(e);
    }
  }
}

import { Request, NextFunction, Response } from "express";
import { deleteFile } from "../utils/imageDelete";
import Post from "../model/Post.model";
import PostMedia from "../model/PostMedia.model";
import User from "../model/User.model";
import Comment from "../model/Comment.model";

interface postBody extends Request {
  userId?: number | undefined;
}

export const CreatePost = async (
  req: postBody,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.body.description && !req.files) {
      return res
        .status(400)
        .json({ message: "Required Fields are not provided" });
    }
    let post: Post = await Post.create({
      description: req.body.description,
      UserId: req.userId,
    });

    if (req.files) {
      let postMedia = [];

      for (let file of req.files as Express.Multer.File[]) {
        postMedia.push({
          PostId: post.id,
          mediaUrl: file.path,
        });
      }
      // console.log("🚀 ~ file: post.controller.js ~ line 40 ~");
      await PostMedia.bulkCreate(postMedia);
    }

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
        { model: PostMedia },
      ],
    });
    res.status(201).json(createdPost);
  } catch (e) {
    res.status(500).json({ message: "something went wrong in creating Posts" });
    console.trace(e);
  }
};

export const editPost = async (
  req: postBody,
  res: Response,
  next: NextFunction
) => {
  try {
    const post: Post | null = await Post.findByPk(req.params.id, {
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
      return res.status(400).json({ message: "Post does not found" });
    }

    if (req.userId !== post.UserId) {
      return res
        .status(400)
        .json({ message: "Only orignal creator can delete the post" });
    }

    post.description = req.body.description;
    if (req.files) {
      let postMedia = [];

      for (let file of req.files as Express.Multer.File[]) {
        postMedia.push({
          PostId: post.id,
          mediaUrl: file.path,
        });
      }
      // console.log("🚀 ~ file: post.controller.js ~ line 40 ~");
      await PostMedia.bulkCreate(postMedia);
    }

    await post.save();
    await post.reload();
    res.status(200).json(post);
  } catch (e) {
    res.status(500).json({ message: "something went wrong in editing Posts" });
    console.trace(e);
  }
};

export const deletePost = async (
  req: postBody,
  res: Response,
  next: NextFunction
) => {
  try {
    const post: Post | null = await Post.findByPk(req.params.id, {
      include: [{ model: PostMedia }],
    });
    if (!post) {
      return res.status(400).json({ message: "Post does not found" });
    }

    if (req.userId !== post.UserId) {
      return res
        .status(400)
        .json({ message: "Only orignal creator can delete the post" });
    }
    await Post.destroy({ where: { id: req.params.id } });

    await PostMedia.destroy({ where: { PostId: req.params.id } });
    if (post.PostMedia.length !== 0) {
      for (let postMedia of post.PostMedia) {
        deleteFile(postMedia.mediaUrl);
      }
    }
    res.status(200).json({ message: "post deleted successfully" });
  } catch (e) {
    res.status(500).json({ message: "something went wrong in Deleting Posts" });
    console.trace(e);
  }
};

export const fetchPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const page: string = req.query.page ? String(req.query.page) : "1";
    const limit: string = req.query.page ? String(req.query.limit) : "10";

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

      offset: (parseInt(page) - 1) * parseInt(limit),
      limit: parseInt(limit),
      order: [["createdAt", "DESC"]],
    });

    // const totalPosts = await Post.findAndCountAll();
    const count = await Post.count({
      distinct: true,
      col: "id",
    });
    // console.log("=======================>", count);
    const pages = Math.ceil(count / parseInt(limit));
    console.log(pages);
    res.status(200).json({ posts: posts, count: pages });
    // res.status(200).json(posts);
  } catch (e) {
    res.status(500).json({ message: "something went wrong in Fetching Posts" });
    console.trace(e);
  }
};

export const fetchPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const post: Post | null = await Post.findByPk(req.params.id, {
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

    res.status(200).json(post);
  } catch (e) {
    res.status(500).json({ message: "something went wrong in Fetching Post" });
    console.trace(e);
  }
};

export const deletePostImage = async (
  req: postBody,
  res: Response,
  next: NextFunction
) => {
  try {
    const post: Post | null = await Post.findByPk(req.params.id, {
      include: [{ model: PostMedia }],
    });
    if (!post) {
      return res.status(400).json({ message: "Post does not found" });
    }

    if (req.userId !== post.UserId) {
      return res
        .status(400)
        .json({ message: "Only orignal creator can delete the post" });
    }
    await PostMedia.destroy({
      where: { id: req.params.imageId },
    });

    for (let postMedia of post.PostMedia) {
      if (postMedia.id === parseInt(req.params.imageId)) {
        deleteFile(postMedia.mediaUrl);
      }
    }

    res.status(200).json({ message: "image deleted successfully" });
  } catch (e) {
    res.status(500).json({ message: "something went wrong in editing Post" });
    console.trace(e);
  }
};

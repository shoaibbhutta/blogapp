import { Request, NextFunction, Response } from "express";
import { authBody } from "../interfaces/common";
import Post from "../model/Post.model";
import PostMedia from "../model/PostMedia.model";
import User from "../model/User.model";
import Comment from "../model/Comment.model";

export const postAddComment = async (
  req: authBody,
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
      return res.status(400).json({ message: "Post not found" });
    }
    const comment: Comment = new Comment({
      CommentId: req.body.rootId || null,
      comment: req.body.comment,
      PostId: parseInt(req.params.id),
      UserId: req.user ? req.user.userId : 1,
    });

    await comment.save();

    await post.reload();
    res.status(200).json(post);
  } catch (e) {
    res
      .status(500)
      .json({ message: "something went wrong in Adding Comment to Post" });
    console.trace(e);
  }
};

// export const editComment = async (req, res, next) => {
//   try {
//     const comment = await Comment.findByPk(req.params.id, {
//       include: [{ model: User }],
//     });

//     if (!comment) {
//       return res.status(400).json({ message: "Post not found" });
//     }

//     if (req.userId !== comment.userId) {
//       return res
//         .status(400)
//         .json({ message: "Only orignal creator can Edit the Comment" });
//     }

//     console.log(req.body.comment);
//     comment.comment = req.body.comment;
//     await comment.save();

//     res.status(200).json({ message: "comment Edited Successfully" });
//   } catch (e) {
//     res
//       .status(500)
//       .json({ message: "something went wrong in Editing Comment to Post" });
//     console.trace(e);
//   }
// };

// export const deleteComment = async (req, res, next) => {
//   try {
//     const comment = await Comment.findByPk(req.params.id, {
//       include: [{ model: User }],
//     });

//     if (!comment) {
//       return res.status(400).json({ message: "Post not found" });
//     }

//     if (req.userId !== comment.userId) {
//       return res
//         .status(400)
//         .json({ message: "Only orignal creator can delete the post" });
//     }

//     await Comment.destroy({ where: { id: req.params.id } });

//     res.status(200).json({ message: "comment deleted Successfully" });
//   } catch (e) {
//     res
//       .status(500)
//       .json({ message: "something went wrong in Deleting Comment to Post" });
//     console.trace(e);
//   }
// };

export const getComments = async (
  req: authBody,
  res: Response,
  next: NextFunction
) => {
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
    res.status(200).json(commments);
  } catch (e) {
    res
      .status(500)
      .json({ message: "something went wrong in getting Comment to Post" });
    console.trace(e);
  }
};

// export const postAddDemoComment = async (
//   req: authBody,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     if (req.body.rootId) {
//       const comment = new DemoComment({
//         comment: req.body.comment,
//         // PostId: parseInt(req.params.id),
//         UserId: req.user ? req.user.userId : 1,
//       });
//       await comment.save();
//     } else {
//       const comment = new DemoComment({
//         comment: req.body.comment,
//         // PostId: parseInt(req.params.id),
//         UserId: req.user ? req.user.userId : 1,
//         CommentId: req.body.rootId,
//       });
//       await comment.save();
//     }

//     res.status(200).json({ message: "done" });
//   } catch (e) {
//     res
//       .status(500)
//       .json({ message: "something went wrong in Adding Comment to Post" });
//     console.trace(e);
//   }
// };

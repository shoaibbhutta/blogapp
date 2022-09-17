import { Request, Response, Router } from "express";
import multer, { FileFilterCallback } from "multer";
import Post from "../model/Post.model";
import PostMedia from "../model/PostMedia.model";
import User from "../model/User.model";
import { deleteFile } from "./imageDelete";

const router = Router();
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const postImageHandler = multer({
  storage: fileStorage,
  fileFilter: fileFilter,
}).any();

const userImageHandler = multer({
  storage: fileStorage,
  fileFilter: fileFilter,
}).single("image");

router.post(
  "/uploadPostImage/:postId",
  postImageHandler,
  async (req: Request, res: Response) => {
    try {
      if (!req.files) {
        return res.status(400).json({ message: "no image provided " });
      }
      const post = await Post.findByPk(req.params.postId, {
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
      if (!post) {
        return res.status(400).json({ message: "no post exist" });
      }

      let postMedia = [];

      for (let file of req.files as Express.Multer.File[]) {
        postMedia.push({
          PostId: post.id,
          mediaUrl: file.path,
        });
      }
      // console.log("🚀 ~ file: post.controller.js ~ line 40 ~");
      const media: PostMedia[] = await PostMedia.bulkCreate(postMedia);
      await post.reload();
      res.status(200).json(post);
    } catch (e) {
      console.log(e);
      res
        .status(500)
        .json({ message: "something went wrong in uplaoding image" });
    }
  }
);

router.delete(
  "/deletePostImage/:id/:imageId",

  async (req: Request, res: Response) => {
    try {
      const post: Post | null = await Post.findByPk(req.params.id, {
        include: [{ model: PostMedia }],
      });
      if (!post) {
        return res.status(400).json({ message: "Post does not found" });
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
      console.log(e);
      res
        .status(500)
        .json({ message: "something went wrong in uplaoding image" });
    }
  }
);

router.put(
  "/editUser/:userId",
  userImageHandler,
  async (req: Request, res: Response) => {
    let user: User | null = await User.findByPk(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: "no user found" });
    }
    if (req.file) {
      user.profileImageUrl = req.file.path;
    }
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.date_of_birth = new Date(req.body.date_of_birth);
    await user.save();
    res.status(200).json(user);
  }
);
export default router;

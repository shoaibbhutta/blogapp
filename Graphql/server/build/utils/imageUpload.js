"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const Post_model_1 = __importDefault(require("../model/Post.model"));
const PostMedia_model_1 = __importDefault(require("../model/PostMedia.model"));
const User_model_1 = __importDefault(require("../model/User.model"));
const imageDelete_1 = require("./imageDelete");
const router = express_1.Router();
const fileStorage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./images");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg") {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
};
const postImageHandler = multer_1.default({
    storage: fileStorage,
    fileFilter: fileFilter,
}).any();
const userImageHandler = multer_1.default({
    storage: fileStorage,
    fileFilter: fileFilter,
}).single("image");
router.post("/uploadPostImage/:postId", postImageHandler, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.files) {
            return res.status(400).json({ message: "no image provided " });
        }
        const post = yield Post_model_1.default.findByPk(req.params.postId, {
            include: [
                {
                    model: User_model_1.default,
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
        for (let file of req.files) {
            postMedia.push({
                PostId: post.id,
                mediaUrl: file.path,
            });
        }
        // console.log("🚀 ~ file: post.controller.js ~ line 40 ~");
        const media = yield PostMedia_model_1.default.bulkCreate(postMedia);
        yield post.reload();
        res.status(200).json(post);
    }
    catch (e) {
        console.log(e);
        res
            .status(500)
            .json({ message: "something went wrong in uplaoding image" });
    }
}));
router.delete("/deletePostImage/:id/:imageId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield Post_model_1.default.findByPk(req.params.id, {
            include: [{ model: PostMedia_model_1.default }],
        });
        if (!post) {
            return res.status(400).json({ message: "Post does not found" });
        }
        yield PostMedia_model_1.default.destroy({
            where: { id: req.params.imageId },
        });
        for (let postMedia of post.PostMedia) {
            if (postMedia.id === parseInt(req.params.imageId)) {
                imageDelete_1.deleteFile(postMedia.mediaUrl);
            }
        }
        res.status(200).json({ message: "image deleted successfully" });
    }
    catch (e) {
        console.log(e);
        res
            .status(500)
            .json({ message: "something went wrong in uplaoding image" });
    }
}));
router.put("/editUser/:userId", userImageHandler, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let user = yield User_model_1.default.findByPk(req.params.userId);
    if (!user) {
        return res.status(404).json({ message: "no user found" });
    }
    if (req.file) {
        user.profileImageUrl = req.file.path;
    }
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.date_of_birth = new Date(req.body.date_of_birth);
    yield user.save();
    res.status(200).json(user);
}));
exports.default = router;

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
exports.PostResolver = exports.createPostBody = void 0;
require("reflect-metadata");
const type_graphql_1 = require("type-graphql");
const auth_1 = require("../../utils/auth");
// import Role from "../../model/Role.model";
const User_model_1 = __importDefault(require("../../model/User.model"));
const Comment_model_1 = __importDefault(require("../../model/Comment.model"));
const Post_model_1 = __importDefault(require("../../model/Post.model"));
const PostMedia_model_1 = __importDefault(require("../../model/PostMedia.model"));
const imageDelete_1 = require("../../utils/imageDelete");
let PostResponse = class PostResponse {
};
__decorate([
    type_graphql_1.Field(() => Post_model_1.default, { nullable: true }),
    __metadata("design:type", Post_model_1.default)
], PostResponse.prototype, "post", void 0);
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], PostResponse.prototype, "message", void 0);
PostResponse = __decorate([
    type_graphql_1.ObjectType()
], PostResponse);
let PostsResponse = class PostsResponse {
};
__decorate([
    type_graphql_1.Field(() => [Post_model_1.default]),
    __metadata("design:type", Array)
], PostsResponse.prototype, "posts", void 0);
__decorate([
    type_graphql_1.Field(() => Number),
    __metadata("design:type", Number)
], PostsResponse.prototype, "count", void 0);
PostsResponse = __decorate([
    type_graphql_1.ObjectType()
], PostsResponse);
// input for creating the post
let createPostBody = class createPostBody {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], createPostBody.prototype, "description", void 0);
createPostBody = __decorate([
    type_graphql_1.InputType()
], createPostBody);
exports.createPostBody = createPostBody;
let PostResolver = class PostResolver {
    getPosts(limit = 10, page = 1) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const posts = yield Post_model_1.default.findAll({
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
                        { model: PostMedia_model_1.default },
                        {
                            model: Comment_model_1.default,
                            // where: {
                            //   CommentId: null,
                            // },
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
                                {
                                    model: Comment_model_1.default,
                                    include: [
                                        {
                                            model: Comment_model_1.default,
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
                                        },
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
                                },
                            ],
                        },
                    ],
                    offset: (page - 1) * limit,
                    limit: limit,
                    order: [["createdAt", "DESC"]],
                });
                // const totalPosts = await Post.findAndCountAll();
                const count = yield Post_model_1.default.count({
                    distinct: true,
                    col: "id",
                });
                // console.log("=======================>", posts);p
                const pages = Math.ceil(count / limit);
                return { posts, count: pages };
            }
            catch (e) {
                console.trace(e);
                // return { message: "something went wrong in postAddRole" };
                throw new Error("some thing went wront at fetch posts");
            }
        });
    }
    createPost(body, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let post = yield Post_model_1.default.create({
                    description: body.description,
                    UserId: req.userId,
                });
                let createdPost = yield Post_model_1.default.findByPk(post.id, {
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
                if (createdPost) {
                    return { post: createdPost };
                }
                else {
                    return { message: "Post creation failed" };
                }
            }
            catch (e) {
                return { message: "something went wrong in createPost" };
                console.trace(e);
            }
        });
    }
    editPost(id, body, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const post = yield Post_model_1.default.findByPk(id, {
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
                        { model: PostMedia_model_1.default },
                        {
                            model: Comment_model_1.default,
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
                                {
                                    model: Comment_model_1.default,
                                    include: [
                                        {
                                            model: Comment_model_1.default,
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
                                        },
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
                yield post.save();
                yield post.reload();
                return { post };
            }
            catch (e) {
                return { message: "something went wrong in createPost" };
                console.trace(e);
            }
        });
    }
    deletePost(id, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const post = yield Post_model_1.default.findByPk(id, {
                    include: [{ model: PostMedia_model_1.default }],
                });
                if (!post) {
                    return { message: "Post does not found" };
                }
                if (req.userId !== post.UserId) {
                    return { message: "Only orignal creator can delete the post" };
                }
                yield Post_model_1.default.destroy({
                    where: { id: id },
                });
                for (let postMedia of post.PostMedia) {
                    imageDelete_1.deleteFile(postMedia.mediaUrl);
                }
                return {
                    message: "image deleted successfully",
                };
            }
            catch (e) {
                return { message: "something went wrong in createPost" };
                console.trace(e);
            }
        });
    }
};
__decorate([
    type_graphql_1.Query(() => PostsResponse),
    type_graphql_1.UseMiddleware(auth_1.isAuth),
    __param(0, type_graphql_1.Arg("limit")),
    __param(1, type_graphql_1.Arg("page")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "getPosts", null);
__decorate([
    type_graphql_1.Mutation(() => PostResponse),
    type_graphql_1.UseMiddleware(auth_1.isAuth),
    __param(0, type_graphql_1.Arg("createPostBody")),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createPostBody, Object]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "createPost", null);
__decorate([
    type_graphql_1.Mutation(() => PostResponse),
    type_graphql_1.UseMiddleware(auth_1.isAuth),
    __param(0, type_graphql_1.Arg("id")),
    __param(1, type_graphql_1.Arg("editPostBody")),
    __param(2, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, createPostBody, Object]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "editPost", null);
__decorate([
    type_graphql_1.Mutation(() => PostResponse),
    type_graphql_1.UseMiddleware(auth_1.isAuth),
    __param(0, type_graphql_1.Arg("id")),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "deletePost", null);
PostResolver = __decorate([
    type_graphql_1.Resolver()
], PostResolver);
exports.PostResolver = PostResolver;

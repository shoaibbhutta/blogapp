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
exports.CommentResolver = exports.createCommentBody = void 0;
require("reflect-metadata");
const type_graphql_1 = require("type-graphql");
const auth_1 = require("../../utils/auth");
const User_model_1 = __importDefault(require("../../model/User.model"));
const Comment_model_1 = __importDefault(require("../../model/Comment.model"));
const Post_model_1 = __importDefault(require("../../model/Post.model"));
const PostMedia_model_1 = __importDefault(require("../../model/PostMedia.model"));
let CommentResponse = class CommentResponse {
};
__decorate([
    type_graphql_1.Field(() => Post_model_1.default, { nullable: true }),
    __metadata("design:type", Post_model_1.default)
], CommentResponse.prototype, "post", void 0);
__decorate([
    type_graphql_1.Field(() => [Comment_model_1.default], { nullable: true }),
    __metadata("design:type", Array)
], CommentResponse.prototype, "Comments", void 0);
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], CommentResponse.prototype, "message", void 0);
CommentResponse = __decorate([
    type_graphql_1.ObjectType()
], CommentResponse);
// input for creating the post
let createCommentBody = class createCommentBody {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], createCommentBody.prototype, "comment", void 0);
__decorate([
    type_graphql_1.Field(() => Number, { nullable: true }),
    __metadata("design:type", Object)
], createCommentBody.prototype, "rootId", void 0);
__decorate([
    type_graphql_1.Field(() => Number),
    __metadata("design:type", Number)
], createCommentBody.prototype, "postId", void 0);
createCommentBody = __decorate([
    type_graphql_1.InputType()
], createCommentBody);
exports.createCommentBody = createCommentBody;
let CommentResolver = class CommentResolver {
    getComments() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const commments = yield Comment_model_1.default.findAll({
                    where: {
                        CommentId: null,
                    },
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
                });
                return { Comments: commments };
            }
            catch (e) {
                return { message: "something went wrong in postAddRole" };
                console.trace(e);
            }
        });
    }
    createComment(body, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const post = yield Post_model_1.default.findByPk(body.postId, {
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
                const comment = new Comment_model_1.default({
                    CommentId: body.rootId || null,
                    comment: body.comment,
                    PostId: body.postId,
                    UserId: req.userId,
                });
                yield comment.save();
                yield post.reload();
                return { post };
            }
            catch (e) {
                return { message: "something went wrong in createPost" };
                console.trace(e);
            }
        });
    }
};
__decorate([
    type_graphql_1.Query(() => CommentResponse),
    type_graphql_1.UseMiddleware(auth_1.isAuth),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CommentResolver.prototype, "getComments", null);
__decorate([
    type_graphql_1.Mutation(() => CommentResponse),
    type_graphql_1.UseMiddleware(auth_1.isAuth),
    __param(0, type_graphql_1.Arg("createCommentBody")),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createCommentBody, Object]),
    __metadata("design:returntype", Promise)
], CommentResolver.prototype, "createComment", null);
CommentResolver = __decorate([
    type_graphql_1.Resolver()
], CommentResolver);
exports.CommentResolver = CommentResolver;

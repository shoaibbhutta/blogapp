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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const type_graphql_1 = require("type-graphql");
const database_1 = __importDefault(require("../config/database"));
const User_model_1 = __importDefault(require("./User.model"));
const PostMedia_model_1 = __importDefault(require("./PostMedia.model"));
const Comment_model_1 = __importDefault(require("./Comment.model"));
let Post = class Post extends sequelize_1.Model {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], Post.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Post.prototype, "description", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], Post.prototype, "UserId", void 0);
__decorate([
    type_graphql_1.Field((type) => User_model_1.default, { nullable: true }),
    __metadata("design:type", User_model_1.default)
], Post.prototype, "User", void 0);
__decorate([
    type_graphql_1.Field((type) => [Comment_model_1.default], { nullable: "itemsAndList" }),
    __metadata("design:type", Array)
], Post.prototype, "Comments", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Date)
], Post.prototype, "createdAt", void 0);
__decorate([
    type_graphql_1.Field((type) => [PostMedia_model_1.default], { nullable: "itemsAndList" }),
    __metadata("design:type", Array)
], Post.prototype, "PostMedia", void 0);
Post = __decorate([
    type_graphql_1.ObjectType()
], Post);
Post.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    description: {
        type: sequelize_1.DataTypes.STRING(1000),
    },
}, {
    tableName: "posts",
    sequelize: database_1.default, // passing the `sequelize` instance is required
});
User_model_1.default.hasMany(Post);
Post.belongsTo(User_model_1.default);
Post.hasMany(PostMedia_model_1.default);
PostMedia_model_1.default.belongsTo(Post);
Post.hasMany(Comment_model_1.default);
Comment_model_1.default.belongsTo(Post);
exports.default = Post;

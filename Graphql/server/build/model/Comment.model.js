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
var Comment_1;
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const type_graphql_1 = require("type-graphql");
const database_1 = __importDefault(require("../config/database"));
const User_model_1 = __importDefault(require("./User.model"));
let Comment = Comment_1 = class Comment extends sequelize_1.Model {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], Comment.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Comment.prototype, "comment", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], Comment.prototype, "PostId", void 0);
__decorate([
    type_graphql_1.Field((type) => [Comment_1], { nullable: "itemsAndList" }),
    __metadata("design:type", Array)
], Comment.prototype, "Comments", void 0);
__decorate([
    type_graphql_1.Field((type) => User_model_1.default, { nullable: true }),
    __metadata("design:type", User_model_1.default)
], Comment.prototype, "User", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", Number)
], Comment.prototype, "CommentId", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], Comment.prototype, "UserId", void 0);
Comment = Comment_1 = __decorate([
    type_graphql_1.ObjectType()
], Comment);
Comment.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    comment: {
        type: sequelize_1.DataTypes.STRING,
    },
}, {
    tableName: "comments",
    sequelize: database_1.default, // passing the `sequelize` instance is required
});
// Comment.isHierarchy();
Comment.hasMany(Comment);
Comment.belongsTo(Comment);
// Comment.isHierarchy();
User_model_1.default.hasMany(Comment);
Comment.belongsTo(User_model_1.default);
exports.default = Comment;

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
let PostMedia = class PostMedia extends sequelize_1.Model {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], PostMedia.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], PostMedia.prototype, "mediaUrl", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], PostMedia.prototype, "PostId", void 0);
PostMedia = __decorate([
    type_graphql_1.ObjectType()
], PostMedia);
PostMedia.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    mediaUrl: {
        type: sequelize_1.DataTypes.STRING(1000),
    },
}, {
    tableName: "postMedia",
    sequelize: database_1.default, // passing the `sequelize` instance is required
});
// console.log(Post, "<<<<<<<<<POST MEDIA");
// Post.hasMany(PostMedia);
// PostMedia.belongsTo(Post);
exports.default = PostMedia;

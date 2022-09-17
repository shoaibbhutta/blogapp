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
require("reflect-metadata");
const type_graphql_1 = require("type-graphql");
const Role_model_1 = __importDefault(require("./Role.model"));
const database_1 = __importDefault(require("../config/database"));
let User = class User extends sequelize_1.Model {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }) // timestamps!
    ,
    __metadata("design:type", Date)
], User.prototype, "date_of_birth", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "profileImageUrl", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", Number)
], User.prototype, "RoleId", void 0);
__decorate([
    type_graphql_1.Field((type) => Role_model_1.default, { nullable: true }),
    __metadata("design:type", Role_model_1.default)
], User.prototype, "role", void 0);
User = __decorate([
    type_graphql_1.ObjectType()
], User);
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    firstName: {
        type: sequelize_1.DataTypes.STRING,
    },
    lastName: {
        type: sequelize_1.DataTypes.STRING,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: "email",
    },
    date_of_birth: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    },
    bio: {
        type: sequelize_1.DataTypes.STRING,
    },
    profileImageUrl: {
        type: sequelize_1.DataTypes.STRING,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: "Users",
    sequelize: database_1.default, // passing the `sequelize` instance is required
});
Role_model_1.default.hasOne(User);
User.belongsTo(Role_model_1.default);
exports.default = User;

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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResollver = void 0;
require("reflect-metadata");
var type_graphql_1 = require("type-graphql");
var UserResollver = /** @class */ (function () {
    function UserResollver() {
    }
    UserResollver.prototype.hello = function () {
        return "hello";
    };
    __decorate([
        type_graphql_1.Query(function () { return String; }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], UserResollver.prototype, "hello", null);
    UserResollver = __decorate([
        type_graphql_1.Resolver()
    ], UserResollver);
    return UserResollver;
}());
exports.UserResollver = UserResollver;
// import { UserInputError } from "apollo-server";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import config from "../../config/config";
// import User from "../../model/User.model";
// interface loginResponse{
//   user: User;
//   token:string
// }
// const userResolver = {
//   Mutation: {
//     async login(_,{email: string, password: string}){
//     },
//   },
// };
// export default userResolver;

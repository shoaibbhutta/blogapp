"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_server_1 = require("apollo-server");
var typeDef = apollo_server_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  type User {\n    id: Int!\n    firstName: String!\n    lastName: String!\n    date_of_birth: String!\n    email: String!\n    profileImageUrl: String\n    password: String!\n    bio: String\n    RoleId: Int!\n    token: String!\n  }\n  input registerInput {\n    firstName: String!\n    lastName: String!\n    date_of_birth: String!\n    email: String\n    password: String!\n  }\n  type loginRespose {\n    token: String\n  }\n\n  type Mutation {\n    login(email: String, password: String): User!\n  }\n"], ["\n  type User {\n    id: Int!\n    firstName: String!\n    lastName: String!\n    date_of_birth: String!\n    email: String!\n    profileImageUrl: String\n    password: String!\n    bio: String\n    RoleId: Int!\n    token: String!\n  }\n  input registerInput {\n    firstName: String!\n    lastName: String!\n    date_of_birth: String!\n    email: String\n    password: String!\n  }\n  type loginRespose {\n    token: String\n  }\n\n  type Mutation {\n    login(email: String, password: String): User!\n  }\n"])));
exports.default = typeDef;
var templateObject_1;

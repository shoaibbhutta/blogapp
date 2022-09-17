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
exports.RoleResollver = void 0;
require("reflect-metadata");
const type_graphql_1 = require("type-graphql");
const auth_1 = require("../../utils/auth");
const Role_model_1 = __importDefault(require("../../model/Role.model"));
let RoleResponse = class RoleResponse {
};
__decorate([
    type_graphql_1.Field(() => Role_model_1.default, { nullable: true }),
    __metadata("design:type", String)
], RoleResponse.prototype, "role", void 0);
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], RoleResponse.prototype, "message", void 0);
RoleResponse = __decorate([
    type_graphql_1.ObjectType()
], RoleResponse);
let RoleResollver = class RoleResollver {
    createRole(name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let role = yield Role_model_1.default.findOne({
                    where: {
                        name: name.toLowerCase(),
                    },
                });
                if (!role) {
                    role = new Role_model_1.default({
                        name: name.toLowerCase(),
                    });
                    yield role.save();
                }
                return role;
            }
            catch (e) {
                return { message: "something went wrong in postAddRole" };
                console.trace(e);
            }
        });
    }
    deleteRole(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let role = yield Role_model_1.default.findOne({
                    where: {
                        id,
                    },
                });
                if (!role) {
                    return { message: "the role with this id was not found" };
                }
                yield Role_model_1.default.destroy({
                    where: {
                        id,
                    },
                });
                return { message: "user deleted successfully" };
            }
            catch (e) {
                return { message: "something went wrong in postAddRole" };
                console.trace(e);
            }
        });
    }
};
__decorate([
    type_graphql_1.Mutation(() => RoleResponse),
    type_graphql_1.UseMiddleware(auth_1.isAuth),
    __param(0, type_graphql_1.Arg("name")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RoleResollver.prototype, "createRole", null);
__decorate([
    type_graphql_1.Mutation(() => RoleResponse),
    type_graphql_1.UseMiddleware(auth_1.isAuth),
    __param(0, type_graphql_1.Arg("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RoleResollver.prototype, "deleteRole", null);
RoleResollver = __decorate([
    type_graphql_1.Resolver()
], RoleResollver);
exports.RoleResollver = RoleResollver;

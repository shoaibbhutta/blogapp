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
exports.UserResollver = exports.signupBody = void 0;
require("reflect-metadata");
const type_graphql_1 = require("type-graphql");
const User_model_1 = __importDefault(require("../../model/User.model"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config/config"));
const auth_1 = require("../../utils/auth");
let LoginResponse = class LoginResponse {
};
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], LoginResponse.prototype, "message", void 0);
__decorate([
    type_graphql_1.Field(() => User_model_1.default, { nullable: true }),
    __metadata("design:type", User_model_1.default)
], LoginResponse.prototype, "user", void 0);
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], LoginResponse.prototype, "token", void 0);
__decorate([
    type_graphql_1.Field(() => Number),
    __metadata("design:type", Number)
], LoginResponse.prototype, "status", void 0);
LoginResponse = __decorate([
    type_graphql_1.ObjectType()
], LoginResponse);
let signupBody = class signupBody {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], signupBody.prototype, "email", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], signupBody.prototype, "firstName", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], signupBody.prototype, "lastName", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], signupBody.prototype, "date_of_birth", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], signupBody.prototype, "password", void 0);
signupBody = __decorate([
    type_graphql_1.InputType()
], signupBody);
exports.signupBody = signupBody;
let SignupResponse = class SignupResponse {
};
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], SignupResponse.prototype, "message", void 0);
__decorate([
    type_graphql_1.Field(() => Number),
    __metadata("design:type", Number)
], SignupResponse.prototype, "status", void 0);
SignupResponse = __decorate([
    type_graphql_1.ObjectType()
], SignupResponse);
let UserResollver = class UserResollver {
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield User_model_1.default.findOne({
                    where: { email: email },
                });
                if (!user) {
                    return { status: 400, message: "no user with message found " };
                }
                const doMatch = bcryptjs_1.default.compareSync(password, user.password);
                if (!doMatch) {
                    return {
                        status: 400,
                        message: "you have entered wrong email or password",
                    };
                }
                const token = jsonwebtoken_1.default.sign({ userId: user.id }, config_1.default.JWTKEY, {
                    expiresIn: "365d",
                });
                // res.status(200).json({ user, token });
                return { status: 200, user, token };
            }
            catch (e) {
                console.trace(e);
                return { status: 500, message: "something went wrong in login" };
                // res.status(200).json({ messsage: "something went wrong in login" });
            }
        });
    }
    signup(userBody) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const email = userBody.email;
                const password = userBody.password;
                const user = yield User_model_1.default.findOne({
                    where: { email: email },
                });
                if (user) {
                    return {
                        status: 400,
                        message: "the user with this email already exist try other",
                    };
                }
                const hashedPassword = bcryptjs_1.default.hashSync(password, bcryptjs_1.default.genSaltSync(10));
                const newUser = new User_model_1.default({
                    firstName: userBody.firstName,
                    lastName: userBody.lastName,
                    date_of_birth: new Date(userBody.date_of_birth),
                    email: email,
                    password: hashedPassword,
                    RoleId: 1,
                });
                yield newUser.save();
                return { status: 200, message: "user created successfully" };
            }
            catch (e) {
                console.trace(e);
                return { status: 500, message: "something went wrong in signup" };
            }
        });
    }
    getLoggedInUser({ req }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_model_1.default.findByPk(req.userId);
            if (!user) {
                throw new Error("no user found");
            }
            else {
                return user;
            }
        });
    }
};
__decorate([
    type_graphql_1.Mutation(() => LoginResponse),
    __param(0, type_graphql_1.Arg("email")),
    __param(1, type_graphql_1.Arg("password")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UserResollver.prototype, "login", null);
__decorate([
    type_graphql_1.Mutation(() => SignupResponse),
    __param(0, type_graphql_1.Arg("userBody")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [signupBody]),
    __metadata("design:returntype", Promise)
], UserResollver.prototype, "signup", null);
__decorate([
    type_graphql_1.UseMiddleware(auth_1.isAuth),
    type_graphql_1.Query(() => User_model_1.default),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserResollver.prototype, "getLoggedInUser", null);
UserResollver = __decorate([
    type_graphql_1.Resolver()
], UserResollver);
exports.UserResollver = UserResollver;

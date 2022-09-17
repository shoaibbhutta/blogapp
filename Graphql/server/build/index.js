"use strict";
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
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const graphql_depth_limit_1 = __importDefault(require("graphql-depth-limit"));
const cors_1 = __importDefault(require("cors"));
const type_graphql_1 = require("type-graphql");
const imageUpload_1 = __importDefault(require("./utils/imageUpload"));
const config_1 = __importDefault(require("../src/config/config"));
const user_resolver_1 = require("./graphQl/resolvers/user.resolver");
const role_resolver_1 = require("./graphQl/resolvers/role.resolver");
const post_resolver_1 = require("./graphQl/resolvers/post.resolver");
const comment_resolver_1 = require("./graphQl/resolvers/comment.resolver");
const databsae_1 = __importDefault(require("../src/config/databsae"));
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const server = new apollo_server_express_1.ApolloServer({
            schema: yield type_graphql_1.buildSchema({
                resolvers: [
                    user_resolver_1.UserResollver,
                    role_resolver_1.RoleResollver,
                    post_resolver_1.PostResolver,
                    comment_resolver_1.CommentResolver,
                ],
            }),
            validationRules: [graphql_depth_limit_1.default(7)],
            context: ({ req }) => {
                const context = {
                    req,
                };
                return context;
            },
        });
        const app = express_1.default();
        app.use(cors_1.default());
        app.use(imageUpload_1.default);
        app.use("/images", express_1.default.static("./images"));
        yield server.start();
        server.applyMiddleware({ app });
        databsae_1.default.authenticate().then(() => {
            app.listen({ port: process.env.port || config_1.default.PORT }, () => console.log(`\n🚀      GraphQL is now running on http://localhost:4000/graphql/`));
        });
    }
    catch (error) {
        console.log("Server not running", error);
    }
});
main();

import express from "express";
import { ApolloServer } from "apollo-server-express";
import depthLimit from "graphql-depth-limit";
import cors from "cors";
import { buildSchema } from "type-graphql";
import imagesRouter from "./utils/imageUpload";
import config from "../src/config/config";
import { UserResollver } from "./graphQl/resolvers/user.resolver";
import { RoleResollver } from "./graphQl/resolvers/role.resolver";
import { PostResolver } from "./graphQl/resolvers/post.resolver";
import { CommentResolver } from "./graphQl/resolvers/comment.resolver";

import database from '../src/config/databsae';

const main = async () => {
  try {
    const server = new ApolloServer({
      schema: await buildSchema({
        resolvers: [
          UserResollver,
          RoleResollver,
          PostResolver,
          CommentResolver,
        ],
      }),
      validationRules: [depthLimit(7)],
      context: ({ req }) => {
        const context = {
          req,
        };
        return context;
      },
    });

    const app = express();
    app.use(cors());
    app.use(imagesRouter);
    app.use("/images", express.static("./images"));
    await server.start();
    server.applyMiddleware({ app });
    database.authenticate().then(() => {
      app.listen({ port: process.env.port || config.PORT }, (): void =>
        console.log(
          `\n🚀      GraphQL is now running on http://localhost:4000/graphql/`
        )
      );
    });
  } catch (error) {
    console.log("Server not running", error);
  }
};

main();

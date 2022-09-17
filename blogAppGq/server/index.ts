import express from "express";
import { ApolloServer } from "apollo-server-express";
import depthLimit from "graphql-depth-limit";
import cors from 'cors';
import { buildSchema } from "type-graphql";
import imagesRouter from "./src/utils/imageUpload";
import config from "./src/config/config";
import { UserResollver } from "./src/graphQl/resolvers/user.resolver";
import { RoleResollver } from "./src/graphQl/resolvers/role.resolver";
import { PostResolver } from "./src/graphQl/resolvers/post.resolver";
import { CommentResolver } from "./src/graphQl/resolvers/comment.resolver";

import database from './src/config/database';

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
      app.listen({ port: 4000 }, (): void =>{
      console.log(
          `\n🚀      GraphQL is now running on http://localhost:4000/graphql/`
        )
      }
      );
    });
  } catch (error) {
    console.log("Server not running", error);
  }
};

main();

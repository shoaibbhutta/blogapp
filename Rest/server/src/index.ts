import express from "express";
import cors from "cors";
import database from "./config/database";
import authRoutes from "./routes/auth.routes";
import roleRoutes from "./routes/role.routes";
import postRoutes from "./routes/post.route";
import commentRoutes from "./routes/comment.routes";
import UserRoutes from "./routes/user.route";
// import path from "path";

process
  .on("unhandledRejection", (reason, p) => {
    console.error(reason, "Unhandled Rejection at Promise", p);
  })
  .on("uncaughtException", (err) => {
    console.error(err, "Uncaught Exception thrown");
    process.exit(1);
  });

const app = express();

app.use(cors());
app.use(express.json());

app.use("/images", express.static("./images"));

// routes

app.use(authRoutes);
app.use(roleRoutes);
app.use(postRoutes);
app.use(commentRoutes);
app.use(UserRoutes);

// global.appRoot:string = path.resolve(__dirname);declare module NodeJS  {
// declare module NodeJS {
//   interface Global {
//     appRoot: string;
//   }
// }

// declare global {
//   const appRoot = path.resolve(__dirname);
// }
database
  .sync({ alter: true }) // when force: true, there would be all data in all tables deleted
  .then(() => {
    app.listen(process.env.PORT || 5000);
    console.log("connected to db");
  });

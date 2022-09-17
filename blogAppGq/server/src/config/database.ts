import { Sequelize } from "sequelize";
import config from "./config";

const sequelize = new Sequelize("blogapp1", "postgres", "kwanso123", {
  dialect: "postgres", //which db we using
  host: config.DBHOST
  // define: {
  //   timestamps: true, // it auto create created_at, updated_at in every table
  // },
});

// this is conntection string we made and exporting so that when our app starts
// this file hould run and we will connect to db
export default sequelize;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("./config"));
const sequelize = new sequelize_1.Sequelize(config_1.default.DBNAME, config_1.default.DBUSER, config_1.default.DBPASS, {
    dialect: "postgres",
    host: config_1.default.DBHOST,
    define: {
        timestamps: true, // it auto create created_at, updated_at in every table
    },
});
// this is conntection string we made and exporting so that when our app starts
// this file hould run and we will connect to db
exports.default = sequelize;

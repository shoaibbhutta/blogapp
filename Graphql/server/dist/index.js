"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_graphql_1 = require("express-graphql");
const graphql_1 = require("graphql");
const app = express_1.default();
const PORT = 4000;
var schema = graphql_1.buildSchema(`
  type Query {
    hello: String
  }
`);
var root = {
    hello: () => {
        return "Hello world!";
    },
};
app.use("/graphql", express_graphql_1.graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));
console.log("====================================>Graphql");
app.listen(PORT, () => {
    console.log("Graphql server now up at port 4000");
});
//# sourceMappingURL=index.js.map
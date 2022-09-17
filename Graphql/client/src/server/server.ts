import { getToken } from "../Utils/Token";
import {
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  HttpLink,
  concat,
} from "@apollo/client";

const authMiddleware = new ApolloLink((operation: any, forward: any) => {
  const token = getToken();
  operation.setContext({
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  return forward(operation);
});
const httpLink = new HttpLink({ uri: "http://localhost:4000/graphql" });
const client = new ApolloClient({
  cache: new InMemoryCache(),
  connectToDevTools: true,

  link: concat(authMiddleware, httpLink),
});

export default client;

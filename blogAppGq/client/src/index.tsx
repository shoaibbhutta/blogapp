import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "@apollo/client";
import client from "./server/server";
import App from "./App";

import { AlertProvider } from "./Context/AlertContext/AlertContext";
import { AuthProvider } from "./Context/AuthContext/AuthContext";

ReactDOM.render(
  <StrictMode>
    <ApolloProvider client={client}>
      <AlertProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </AlertProvider>
    </ApolloProvider>
  </StrictMode>,
  document.getElementById("root")
);

import { StrictMode } from "react";
import ReactDOM from "react-dom";

import App from "./App";

import { AlertProvider } from "./Context/AlertContext/AlertContext";
import { AuthProvider } from "./Context/AuthContext/AuthContext";

ReactDOM.render(
  <StrictMode>
    <AlertProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </AlertProvider>
  </StrictMode>,
  document.getElementById("root")
);

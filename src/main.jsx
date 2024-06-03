import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./normalize.css";
import "./variables.css";
import "./index.css";
import "./utilities/utilities.css";
import { GlobalProvider } from "./context/GlobalContext.jsx";
import BrowserRouter from "./router/Router.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GlobalProvider>
      <BrowserRouter />
    </GlobalProvider>
  </React.StrictMode>
);

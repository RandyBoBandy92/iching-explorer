import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./normalize.css";
import "./variables.css";
import "./index.css";
import "./utilities/utilities.css";
import { GlobalProvider } from "./context/GlobalContext.jsx";
import { RouterProvider } from "react-router-dom";
import { browserRouter } from "./router/Router.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GlobalProvider>
      <RouterProvider router={browserRouter} />
    </GlobalProvider>
  </React.StrictMode>
);

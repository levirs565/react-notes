import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import "@fontsource-variable/montserrat";
import { I8nProvider } from "./provider/i8n.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <I8nProvider>
        <App />
      </I8nProvider>
    </BrowserRouter>
  </React.StrictMode>
);

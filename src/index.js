import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { HashRouter } from "react-router-dom";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <HashRouter>
    <App />
  </HashRouter>
);

import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./components/App/App";

const rootElement = document.getElementById("root");

createRoot(rootElement).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
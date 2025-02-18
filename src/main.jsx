import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router";
import App from "./App";
import "./index.css";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <HashRouter >
    <Routes>
      <Route path="/" element={<App />} />
    </Routes>
  </HashRouter>,
);

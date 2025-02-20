import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Article from "./components/Article.jsx";
import Footer from "./components/Footer.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="" element={<App />} />
        <Route path="/article/:slug" element={<Article />} />
      </Routes>
    </BrowserRouter>{" "}
    <Footer />
  </StrictMode>
);

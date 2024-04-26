import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import "../node_modules/@fortawesome/fontawesome-free/css/all.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.scss";
import { QueryClientProvider, QueryClient } from "react-query";

let queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);

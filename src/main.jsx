import React from "react";
import ReactDOM, { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import LeaderBoard from "./Pages/LeaderBoard";
import Questions from "./Pages/Questions";
import Home from "./Pages/Home";
import Login from "./Pages/Login";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/leaderboard" element={<LeaderBoard />} />
      <Route path="/questions" element={<Questions />} />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} >
    <App />
  </RouterProvider>
);

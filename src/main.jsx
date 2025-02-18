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
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import PrivateRoutes from "./privateRoutes/Privateroutes";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path="/login" element={<Login />} />

      <Route element={<PrivateRoutes/>} >
      <Route path="/leaderboard" element={<LeaderBoard />} />
      <Route path="/questions" element={<Questions />} />

      </Route>
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
);

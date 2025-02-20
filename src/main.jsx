import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import PrivateRoutes from "./privateRoutes/Privateroutes.jsx"; // Ensure this exists
import LeaderBoard from "./Pages/LeaderBoard";
import Questions from "./Pages/Questions.jsx";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import ResultPage from "./Pages/Result/ResultPage";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store"; // Ensure correct path
import Instructions from "./Pages/Instructions.jsx";
import LifelinesPage from "../../RC_Frontend_Rd1/src/Pages/Lifelines/LifelinesPage.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path="/login" element={<Login />} />

      <Route element={<PrivateRoutes />}>
      <Route path="/instructions" element={<Instructions />} />

        <Route path="/leaderboard" element={<LeaderBoard />} />
        <Route path="/questions" element={<Questions />} />
        <Route path="/result" element={<ResultPage />} />
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

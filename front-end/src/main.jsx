import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import "./index.css";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";

import Layout from "./components/Layout/Layout.jsx";
import Home from "./components/Home/Home.jsx";
import DisasterPrediction from "./components/DisasterPrediction/DisasterPrediction.jsx";
import { LocationProvider } from "./components/Context/LocationContext.jsx";
import DisasterNavigation from "./components/DisasterNavigation/DisasterNavigation.jsx";
import DisasterAlerts from "./components/DisasterAlerts/DisasterAlerts.jsx";
import Food from "./components/Food/Food.jsx";
import Admin from "./components/Admin/Admin.jsx";
import AdminDashBoard from "./components/Admin/AdminDashboard.jsx";
import WeatherForecast from "./components/WeatherForecast/WeatherForecast.jsx";
import Signup from "./components/Signup/Signup.jsx";
import CommunityForum from "./components/CommunityForum/CommunityForum.jsx";
import DisasterInfo from "./components/DisasterInfo/DisasterInfo.jsx";
import Tsunami from "./components/DisasterInfo/Tsunami.jsx";
import Earthquake from "./components/DisasterInfo/Earthquake.jsx";
import Wildfire from "./components/DisasterInfo/Wildfire.jsx";
import Hurricane from "./components/DisasterInfo/Hurricane.jsx";
import Landslide from "./components/DisasterInfo/Landslide.jsx";
import Flood from "./components/DisasterInfo/Flood.jsx";

// Redirector Component
const Redirector = () => {
  const isSignedUp = localStorage.getItem("isSignedUp");
  return isSignedUp === "true" ? (
    <Navigate to="/app/home" replace />
  ) : (
    <Navigate to="/signup" replace />
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Redirector />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/app",
    element: <Layout />,
    children: [
      { path: "home", element: <Home /> },
      { path: "disaster-prediction", element: <DisasterPrediction /> },
      { path: "safe-route", element: <DisasterNavigation /> },
      { path: "alerts", element: <DisasterAlerts /> },
      { path: "food-availability", element: <Food /> },
      { path: "admin", element: <Admin /> },
      { path: "admin/dashboard", element: <AdminDashBoard /> },
      { path: "community-forum", element: <CommunityForum /> },
      { path: "weather-forecast", element: <WeatherForecast /> },
      { path: "disaster-info", element: <DisasterInfo /> },
      { path: "tsunami", element: <Tsunami /> },
      { path: "earthquake", element: <Earthquake /> },
      { path: "wildfire", element: <Wildfire /> },
      { path: "hurricane", element: <Hurricane /> },
      { path: "landslide", element: <Landslide /> },
      { path: "flood", element: <Flood /> },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <I18nextProvider i18n={i18n}>
      <LocationProvider>
        <RouterProvider router={router} />
      </LocationProvider>
    </I18nextProvider>
  </StrictMode>
);

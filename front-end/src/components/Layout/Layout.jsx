import { Outlet, Navigate, useLocation } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

const Layout = () => {
  const isSignedUp = localStorage.getItem("isSignedUp");
  const location = useLocation();

  if (!isSignedUp) {
    return <Navigate to="/signup" replace />;
  }

  // ✅ Redirect to /app/home only if the exact pathname is "/app"
  if (location.pathname === "/app") {
    return <Navigate to="/app/home" replace />;
  }

  return (
    <div>
      <Navbar />
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;

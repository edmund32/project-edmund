import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const token = localStorage.getItem("token");

  // kalau sudah login, cegah masuk ke /login atau /register
  if (token) {
    return <Navigate to="/products" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;

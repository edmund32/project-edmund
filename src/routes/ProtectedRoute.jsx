import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const token = localStorage.getItem("token");

  // Kalau belum login (tidak ada token), langsung redirect tanpa loader
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Kalau sudah login, lanjutkan ke route berikutnya
  return <Outlet />;
};

export default ProtectedRoute;

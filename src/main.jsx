import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./Pages/login";
import RegisterPage from "./Pages/register.jsx";
import ErrorPage from "./Pages/404.jsx";
import ProductsPage from "./Pages/products.jsx";
import ProfilePage from "./Pages/profile.jsx";
import ProductsDetail from "./Pages/productDetail.jsx";
import { Provider } from "react-redux";
import store from "./redux/store";
import DarkModeContextProvider from "./context/DarkMode.jsx";
import { TotalPriceProvider } from "./context/totalPriceCon.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import PublicRoute from "./routes/PublicRoute.jsx";
import { NotificationProvider } from "./context/NotificationCon.jsx";
import { Navigate } from "react-router-dom";
import PopupAlert from "./components/Global/PopupAlert.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
    errorElement: <ErrorPage />,
  },
  {
    element: <PublicRoute />,
    children: [
      { path: "/login", element: <LoginPage /> },
      { path: "/register", element: <RegisterPage /> },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      { path: "/products", element: <ProductsPage /> },
      { path: "/profile", element: <ProfilePage /> },
      { path: "products/:id", element: <ProductsDetail /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  //<StrictMode>
    <Provider store={store}>
      <DarkModeContextProvider>
        <TotalPriceProvider>
          <NotificationProvider>
            <PopupAlert />
            <RouterProvider router={router} />
          </NotificationProvider>
        </TotalPriceProvider>
      </DarkModeContextProvider>
    </Provider>
  //</StrictMode>
);

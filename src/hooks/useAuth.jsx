import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearCart } from "../redux/slices/cartSlice";
import { validateToken } from "../services/utils/auth";

export const useAuth = () => {
  const [username, setUsername] = useState("");
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const isValid = validateToken();

    if (!isValid) {
      localStorage.clear();
      dispatch(clearCart());
      navigate("/login");
      return;
    }

    const name = localStorage.getItem("username");
    if (name) setUsername(name);
    
    setIsAuthChecked(true);

  }, []);

  const handleLogout = () => {
    dispatch(clearCart());
    localStorage.clear();
    setUsername("");
    navigate("/login");
  };

  return { username, setUsername, isAuthChecked, handleLogout };
};

// hooks/useAuth.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const [username, setUsername] = useState("");
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const name = localStorage.getItem("username");
    if (name) setUsername(name);
    setIsAuthChecked(true);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return { username, setUsername, isAuthChecked, handleLogout };
};

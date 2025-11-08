import { useEffect, useState } from "react";
import { getUsername } from "../services/auth.services";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const [username, setUsername] = useState("");
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const name = getUsername(token);
      setUsername(name);
    }

    // tandai bahwa proses pengecekan selesai (biar bisa dipakai untuk loading screen, kalau mau)
    setIsAuthChecked(true);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login"); 
  };

  return { username, isAuthChecked, handleLogout };
};

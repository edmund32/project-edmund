import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
//import { getUsername } from "../services/auth.services";

export const useLogin = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUsername(getUsername(token));
    }
  }, []);

  return username;
};

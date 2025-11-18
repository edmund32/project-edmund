import { api } from "./mockAPI";
import { generateFakeJWT } from "./fakeJWT";

const API_URL = "/users";

// Get all users
export const getUsers = async () => {
  const res = await api.get(API_URL);
  return res.data;
};

// Register new user
export const registerUser = async (userData) => {
  try {
    const res = await api.post(API_URL, userData);
    return { success: true, data: res.data };
  } catch (error) {
    console.error("Error saat registrasi:", error);
    return { success: false, error: error.message };
  }
};

// Login
export const login = async (data, callback) => {
  try {
    const users = await getUsers();
    const user = users.find(
      (u) => u.username === data.username && u.password === data.password
    );

    if (!user) {
      callback(false, null);
      return;
    }

    // generate fake jwt
    const token = generateFakeJWT(user);

    // Simpan token & user info
    localStorage.setItem("token", token);
    localStorage.setItem("userId", user.id);
    localStorage.setItem("username", user.username);
    localStorage.setItem("password", user.password);

    callback(true, token);
  } catch (err) {
    console.error(err);
    callback(false, null);
  }
};

// Get username
export const getUsername = () => {
  return localStorage.getItem("username") || "";
};

// Update user data
export const updateUser = async (id, data) => {
  try {
    const res = await api.put(`${API_URL}/${id}`, data);
    const updatedUser = res.data;

    // Sinkron localStorage
    const storedUser = JSON.parse(localStorage.getItem("user")) || {};
    const newUser = { ...storedUser, ...updatedUser };

    localStorage.setItem("user", JSON.stringify(newUser));

    if (updatedUser.username)
      localStorage.setItem("username", updatedUser.username);
    if (updatedUser.password)
      localStorage.setItem("password", updatedUser.password);

    return updatedUser;
  } catch (err) {
    console.error("Error updateUser:", err);
    throw err;
  }
};

// Delete
export const deleteUser = async (id) => {
  const res = await api.delete(`${API_URL}/${id}`);
  return res.data;
};


// import axios from "axios";
// import { jwtDecode } from "jwt-decode";

// export const login = (data, callback) => {
//   axios
//     .post("https://fakestoreapi.com/auth/login", data)
//     .then((res) => {
//       callback(true, res.data.token);
//     })
//     .catch((error) => {
//       callback(false, error);
//     });
// };

// export const getUsername = (token) => {
//   const decoded = jwtDecode(token);
//   return decoded.user;
// };

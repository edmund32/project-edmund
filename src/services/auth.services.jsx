const API_URL = "https://6906018eee3d0d14c13464ed.mockapi.io/users";

// Get all users
export const getUsers = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Gagal memuat data pengguna");
  return await res.json();
};

// Register new user
export const registerUser = async (userData) => {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    if (!res.ok) throw new Error("Gagal registrasi");

    const result = await res.json();
    return { success: true, data: result };
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

    // Simulasi token & simpan data user local storage
    const fakeToken = `mocktoken-${user.id}`;
    localStorage.setItem("password", user.password);
    localStorage.setItem("userId", user.id);
    localStorage.setItem("username", user.username);

    callback(true, fakeToken);
  } catch (err) {
    console.error(err);
    callback(false, null);
  }
};

// Get username (untuk useAuth)
export const getUsername = () => {
  return localStorage.getItem("username") || "";
};

// Update user data
export const updateUser = async (id, data) => {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("Gagal update user");

    const updatedUser = await res.json();

    // Update juga ke localStorage biar sinkron
    const storedUser = JSON.parse(localStorage.getItem("user")) || {};
    const newUser = { ...storedUser, ...updatedUser };
    localStorage.setItem("user", JSON.stringify(newUser));

    // Simpan username & password juga biar gampang dipakai ulang
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

// Delete user
export const deleteUser = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  return await res.json();
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

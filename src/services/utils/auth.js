export const isTokenExpired = (token) => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const now = Math.floor(Date.now() / 1000);
    return now > payload.exp;
  } catch (err) {
    return true;
  }
};

export const validateToken = () => {
  const token = localStorage.getItem("token");
  if (!token) return false;

  if (isTokenExpired(token)) {
    return false;
  }

  return true;
};

export const passwordValidation = {
  required: "Password wajib diisi",
  minLength: {
    value: 8,
    message: "Password minimal 8 karakter",
  },
  pattern: {
    value:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/,
    message:
      "Password harus mengandung huruf besar, kecil, angka, dan simbol",
  },
};

export const usernameValidation = {
  required: "Username wajib diisi",
  pattern: {
    value: /^[a-z0-9_]+$/, // hanya huruf kecil, angka, dan underscore

  }};
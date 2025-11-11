export const usernameValidation = {
  required: "Username wajib diisi",
  pattern: {
    value: /^[a-z0-9_]+$/,
    message: "Username hanya boleh huruf kecil tanpa spasi",
  },
  validate: (value) => {
    if (/\s/.test(value)) return "Username tidak boleh mengandung spasi";
    if (/[A-Z]/.test(value)) return "Username harus huruf kecil semua";
    return true;
  },
};

export const passwordValidation = {
  required: "Password wajib diisi",
  minLength: {
    value: 8,
    message: "Password minimal 8 karakter",
  },
  pattern: {
    value:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/,
    message: "Password harus mengandung huruf besar, kecil, angka, dan simbol",
  },
};

export const updateValidation = (data, currentUsername, currentPassword) => {
  const errors = {};

  // Username validation
  if (data.username) {
    if (data.username.trim() === "") {
      errors.username = "Username tidak boleh kosong";
    } else if (data.username === currentUsername) {
      errors.username = "Username tidak boleh sama dengan username saat ini";
    }
  }

  // Password validation
  if (data.password) {
    if (data.password.trim() === "") {
      errors.password = "Password tidak boleh kosong";
    } else if (data.password === currentPassword) {
      errors.password = "Password tidak boleh sama dengan password saat ini";
    }
  }

  return errors;
};

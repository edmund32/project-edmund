export const usernameValidation = {
  required: "Username wajib diisi",
  pattern: {
    value: /^[a-z0-9_]+$/, // hanya huruf kecil, angka, dan underscore
    message: "Username hanya boleh huruf kecil tanpa spasi",
  },
  validate: (value) => {
    if (/\s/.test(value)) {
      return "Username tidak boleh mengandung spasi";
    }
    if (/[A-Z]/.test(value)) {
      return "Username harus huruf kecil semua";
    }
    return true;
  },
};

import { forwardRef, useState } from "react";
import Input from "./Input";
import Label from "./Label";
import { Eye, EyeOff } from "lucide-react";
import { useContext } from "react";
import { DarkMode } from "../../../context/DarkMode";

const InputForm = forwardRef((props, ref) => {
  const { label, name, type, placeholder, value, onChange, error, compact } = props;
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  const showInlineError =
    error && error !== "Username atau password salah, silahkan coba lagi.";

  const { isDarkMode } = useContext(DarkMode);

  return (
    <div className={`${compact ? "mb-2" : "mb-1.75"} relative`}>
      <Label htmlFor={name}>{label}</Label>
      <Input
        ref={ref}
        name={name}
        type={inputType}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`transition-all duration-300 ${
          error ? "border-red-500 focus:border-red-500" : ""
        }`}
      />

      {isPassword && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className={` absolute inset-y-0 right-3 pt-3 flex items-center text-slate-400 transition duration-300 ${
            isDarkMode ? "hover:text-indigo-400" : "hover:text-indigo-700"
          }`}
          tabIndex={-1}
        >
          {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
        </button>
      )}

      <div className="h-4">
        {showInlineError && (
          <p
            className="text-xs text-red-500 animate-fade-in transition-all duration-300"
            key={error}
          >
            {error}
          </p>
        )}
      </div>
    </div>
  );
});

export default InputForm;

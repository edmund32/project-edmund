import { forwardRef, useContext } from "react";
import { DarkMode } from "../../../context/DarkMode";


const Input = forwardRef((props, ref) => {
  const { isDarkMode } = useContext(DarkMode);
  const { type, placeholder, name, value, onChange, className } = props;
  return (
    <input
      ref={ref}
      type={type}
      name={name}
      id={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`text-sm border-2 rounded-md w-full py-2 px-3 text-black placeholder:text-slate-400
        focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 ${className} 
        ${isDarkMode ? "bg-slate-900 text-white" : "bg-slate-200 text-black"}`}
    />
  );
});

export default Input;

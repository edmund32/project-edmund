import { forwardRef, use, useContext } from "react"; 
import { DarkMode } from "../../../context/DarkMode";


const Input = forwardRef((props, ref) => {
  const { isDarkMode } = useContext(DarkMode);
  const { type, placeholder, name, value, onChange, className } = props;
  const productPath = window.location.pathname.includes("/products");
  
  if(productPath){
    return (
      <input
        ref={ref}
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`!h-11.25 !py-2 text-md rounded-lg w-full py-2 px-3 text-black placeholder:text-slate-400
          focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 ${className} 
          ${isDarkMode ? "bg-slate-800 text-white" : "bg-white text-black"}`}
      />
    );
  }
  
  return (
    <input
      ref={ref}
      type={type}
      name={name}
      id={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`text-xs sm:text-sm border-2 rounded-md w-full py-1.75 sm:py-2 px-3 text-black placeholder:text-slate-400
        focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 ${className} 
        ${isDarkMode ? "bg-slate-900 text-white" : "bg-slate-200 text-black"}`}
    />
  );
});

export default Input;

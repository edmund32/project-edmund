import { useContext } from "react";
import { DarkMode } from "../../../context/DarkMode";

const Label = (props) => {
  const { isDarkMode } = useContext(DarkMode);
  const { htmlFor, children } = props;
  return (
    <label
      htmlFor={htmlFor}
      className={`block text-xs sm:text-sm font-bold mb-2 md:w-1/2 transition-colors duration-300 ${
        isDarkMode ? "text-white" : "text-black"
      }`}
    >
      {children}
    </label>
  );
};

export default Label;

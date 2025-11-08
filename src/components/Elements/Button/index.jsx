function Button(props) {
  const {
    variant = {},
    children = "Placeholder",
    className = "",
    onClick = () => {},
    type = "button",
  } = props;

  const {
    bg = "bg-amber-700",
    text = "text-white",
    hoverBg = "hover:bg-slate-200",
    hoverText = "hover:text-indigo-700",
  } = variant;

  return (
    <button
      className={`flex items-center justify-center py-1 px-1 font-semibold rounded-lg 
          ${bg} ${text} ${hoverBg} ${hoverText} hover:scale-100 hover:duration-300 
          transition-all duration-300 cursor-pointer ${className}`}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;

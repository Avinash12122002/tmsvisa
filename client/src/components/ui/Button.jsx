const Button = ({
  children,
  loading = false,
  variant = "primary",
  className = "",
  disabled = false,
  type = "button",
  ...props
}) => {
  const baseStyles =
    "w-full py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2";

  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",

    secondary: "bg-gray-200 text-black hover:bg-gray-300",

    danger: "bg-red-600 text-white hover:bg-red-700",
  };

  return (
    <button
      type={type}
      disabled={loading || disabled}
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${loading || disabled ? "opacity-70 cursor-not-allowed" : ""}
        ${className}
      `}
      {...props}
    >
      {loading && (
        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
      )}

      {loading ? "Please wait..." : children}
    </button>
  );
};

export default Button;

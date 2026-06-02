const Loader = ({
  fullScreen = true,
  size = "md",
  text = "",
  overlay = false,
}) => {
  const sizes = {
    sm: "w-5 h-5 border-2",
    md: "w-10 h-10 border-4",
    lg: "w-16 h-16 border-4",
  };

  return (
    <div
      className={`
        flex flex-col items-center justify-center gap-4

        ${fullScreen ? "min-h-screen" : ""}

        ${overlay ? "fixed inset-0 bg-black/20 backdrop-blur-sm z-50" : ""}
      `}
    >
      {/* Spinner */}
      <div
        className={`
          ${sizes[size]}
          border-blue-600
          border-t-transparent
          rounded-full
          animate-spin
        `}
      ></div>

      {/* Loading Text */}
      {text && <p className="text-gray-600 text-sm font-medium">{text}</p>}
    </div>
  );
};

export default Loader;

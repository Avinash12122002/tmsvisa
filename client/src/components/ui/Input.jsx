import { useState } from "react";

import { Eye, EyeOff } from "lucide-react";

const Input = ({
  label,
  error,
  type = "text",
  icon,
  disabled = false,
  className = "",
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";

  return (
    <div className="mb-5">
      {/* LABEL */}
      <label className="block mb-2 text-sm font-semibold text-gray-700">
        {label}
      </label>

      {/* INPUT WRAPPER */}
      <div className="relative">
        {/* LEFT ICON */}
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}

        {/* INPUT */}
        <input
          type={isPassword ? (showPassword ? "text" : "password") : type}
          disabled={disabled}
          className={`
            w-full
            rounded-xl
            border
            bg-white
            px-4
            py-3
            text-sm
            outline-none
            transition-all
            duration-300
            ${icon ? "pl-10" : ""}
            ${isPassword ? "pr-12" : ""}
            ${
              error
                ? "border-red-500 focus:ring-2 focus:ring-red-300"
                : "border-gray-300 focus:ring-2 focus:ring-blue-400"
            }
            ${disabled ? "bg-gray-100 cursor-not-allowed" : ""}
            ${className}
          `}
          {...props}
        />

        {/* PASSWORD TOGGLE */}
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>

      {/* ERROR MESSAGE */}
      {error && <p className="mt-1 text-sm text-red-500">{error.message}</p>}
    </div>
  );
};

export default Input;

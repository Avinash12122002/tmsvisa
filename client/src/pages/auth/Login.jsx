import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { Link, useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import { Helmet } from "react-helmet-async";

import { Mail, Lock } from "lucide-react";

import { loginSchema } from "../../schemas/loginSchema";

import { loginUser } from "../../services/authService";

import { useAuth } from "../../context/AuthContext";

import Input from "../../components/ui/Input";

import Button from "../../components/ui/Button";

const Login = () => {
  const navigate = useNavigate();

  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  // ======================
  // SUBMIT
  // ======================

  const onSubmit = async (data) => {
    try {
      const response = await loginUser(data);

      login(response.user, response.token);

      toast.success("Login successful");

      if (response.user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };

  return (
    <>
      {/* SEO */}
      <Helmet>
        <title>Login - TMS VISA</title>

        <meta name="description" content="Login to your TMS VISA account" />
      </Helmet>

      {/* PAGE */}
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
        {/* CARD */}
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">
          {/* HEADER */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800">Welcome Back</h1>

            <p className="text-gray-500 mt-2">Login to continue</p>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* EMAIL */}
            <Input
              label="Email"
              type="email"
              icon={<Mail size={18} />}
              placeholder="Enter your email"
              {...register("email")}
              error={errors.email}
            />

            {/* PASSWORD */}
            <Input
              label="Password"
              type="password"
              icon={<Lock size={18} />}
              placeholder="Enter your password"
              {...register("password")}
              error={errors.password}
            />

            {/* REMEMBER + FORGOT */}
            <div className="flex items-center justify-between mb-6 text-sm">
              <label className="flex items-center gap-2 text-gray-600">
                <input type="checkbox" className="rounded" />
                Remember me
              </label>

              <Link
                to="/forgot-password"
                className="text-blue-600 hover:underline font-medium"
              >
                Forgot Password?
              </Link>
            </div>

            {/* BUTTON */}
            <Button type="submit" loading={isSubmitting}>
              Login
            </Button>
          </form>

          {/* REGISTER */}
          <p className="text-center text-gray-600 text-sm mt-8">
            Don&apos;t have an account?{" "}
            <Link
              to="/register"
              className="text-blue-600 font-semibold hover:underline"
            >
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;

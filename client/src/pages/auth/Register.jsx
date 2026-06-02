import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { Link, useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import { Helmet } from "react-helmet-async";

import { Mail, Lock, User } from "lucide-react";

import { registerSchema } from "../../schemas/registerSchema";

import { registerUser } from "../../services/authService";

import Input from "../../components/ui/Input";

import Button from "../../components/ui/Button";

const Register = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,

    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  // ======================
  // SUBMIT
  // ======================

  const onSubmit = async (data) => {
    try {
      await registerUser(data);

      toast.success("Registration successful");

      navigate("/login");
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };

  return (
    <>
      {/* SEO */}
      <Helmet>
        <title>Register - TMS VISA</title>

        <meta name="description" content="Create your TMS VISA account" />
      </Helmet>

      {/* PAGE */}
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
        {/* CARD */}
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">
          {/* HEADER */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800">Create Account</h1>

            <p className="text-gray-500 mt-2">Join TMS VISA today</p>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* NAME */}
            <Input
              label="Full Name"
              type="text"
              icon={<User size={18} />}
              placeholder="Enter your name"
              {...register("name")}
              error={errors.name}
            />

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
              placeholder="Enter password"
              {...register("password")}
              error={errors.password}
            />

            {/* CONFIRM PASSWORD */}
            <Input
              label="Confirm Password"
              type="password"
              icon={<Lock size={18} />}
              placeholder="Confirm password"
              {...register("confirmPassword")}
              error={errors.confirmPassword}
            />

            {/* TERMS */}
            <div className="flex items-start gap-2 mb-6 text-sm text-gray-600">
              <input type="checkbox" required className="mt-1" />

              <p>
                I agree to the{" "}
                <span className="text-blue-600 font-medium cursor-pointer">
                  Terms & Conditions
                </span>
              </p>
            </div>

            {/* BUTTON */}
            <Button type="submit" loading={isSubmitting}>
              Create Account
            </Button>
          </form>

          {/* LOGIN */}
          <p className="text-center text-gray-600 text-sm mt-8">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 font-semibold hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;

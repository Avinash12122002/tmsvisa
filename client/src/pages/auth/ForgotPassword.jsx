import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { resetPasswordSchema } from "../../schemas/resetPasswordSchema";

import toast from "react-hot-toast";

import { Helmet } from "react-helmet-async";

import { Mail, Lock } from "lucide-react";

import { Link } from "react-router-dom";

import Input from "../../components/ui/Input";

import Button from "../../components/ui/Button";

import { resetPassword } from "../../services/authService";

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,

    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
  });

  // ======================
  // SUBMIT
  // ======================

  const onSubmit = async (data) => {
    try {
      await resetPassword({
        email: data.email,

        password: data.password,
      });

      toast.success("Password updated successfully");
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };

  return (
    <>
      {/* SEO */}
      <Helmet>
        <title>Reset Password</title>

        <meta
          name="description"
          content="Reset your TMS VISA account password"
        />
      </Helmet>

      {/* PAGE */}
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
        {/* CARD */}
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">
          {/* HEADER */}
          <h1 className="text-4xl font-bold text-center mb-2">
            Reset Password
          </h1>

          <p className="text-center text-gray-500 mb-8">Update your password</p>

          {/* FORM */}
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* EMAIL */}
            <Input
              label="Email"
              type="email"
              icon={<Mail size={18} />}
              placeholder="Enter email"
              {...register("email")}
              error={errors.email}
            />

            {/* NEW PASSWORD */}
            <Input
              label="New Password"
              type="password"
              icon={<Lock size={18} />}
              placeholder="Enter new password"
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

            {/* BUTTON */}
            <Button type="submit" loading={isSubmitting}>
              Update Password
            </Button>
          </form>

          {/* BACK TO LOGIN */}
          <div className="mt-6 text-center">
            <Link to="/login" className="text-blue-600 hover:underline">
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;

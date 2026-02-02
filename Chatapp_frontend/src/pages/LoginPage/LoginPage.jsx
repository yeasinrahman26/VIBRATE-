import { useState } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import {
  Eye,
  EyeOff,
  Mail,
  MessageSquare,
  User,
  Lock,
  Loader2,
} from "lucide-react";
import { Link } from "react-router-dom";
import AuthImagePattern from "../../components/hooks/AuthImagePattern";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login, isLoggingIng } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();

    login(formData);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* left side */}
      <div className="flex flex-col justify-center items-center p-12 md:p-6 relative">
        {/* Floating decorative elements */}
        <div className="absolute top-10 right-10 w-16 h-16 bg-primary/10 rounded-full animate-bounce hidden lg:block"></div>
        <div className="absolute bottom-10 left-10 w-10 h-10 bg-secondary/10 rounded-lg rotate-45 animate-pulse hidden lg:block"></div>

        <div className="w-full max-w-md relative">
          {/* Gradient glow behind card */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 blur-xl rounded-2xl"></div>

          {/* Card */}
          <div className="relative bg-base-100 border border-primary/20 p-8 rounded-3xl shadow-xl space-y-6">
            {/* Logo */}
            <div className="text-center">
              <div className="flex flex-col items-center gap-2 group">
                <div
                  className="relative size-16 rounded-2xl bg-base-100  flex items-center justify-center 
                 group-hover:scale-105 transition-transform duration-300"
                >
                  <MessageSquare className="size-7 text-primary animate-pulse" />
                </div>
                <h1 className="text-2xl font-bold mt-3">Welcome Back</h1>
              </div>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent to-primary/30"></div>
              <span className="text-base-content/40 text-xs">
                Sign in to your account
              </span>
              <div className="flex-1 h-px bg-gradient-to-l from-transparent to-primary/30"></div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium text-sm">Email</span>
                </label>
                <div className="relative group">
                  <div className="absolute inset-0 bg-primary/5 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="size-5 text-base-content/40 group-focus-within:text-primary transition-colors" />
                  </div>
                  <input
                    type="email"
                    className="input input-bordered w-full pl-10 rounded-xl relative bg-transparent focus:border-primary transition-colors"
                    placeholder="sheikhmojib15@gmail.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* Password */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium text-sm">
                    Password
                  </span>
                </label>
                <div className="relative group">
                  <div className="absolute inset-0 bg-primary/5 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="size-5 text-base-content/40 group-focus-within:text-primary transition-colors" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="input input-bordered w-full pl-10 rounded-xl relative bg-transparent focus:border-primary transition-colors"
                    placeholder="**** **** ****"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-base-content/40 hover:text-primary transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="size-5" />
                    ) : (
                      <Eye className="size-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn btn-primary w-full rounded-xl relative overflow-hidden group"
                disabled={isLoggingIng}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <span className="relative flex items-center justify-center gap-2">
                  {isLoggingIng ? (
                    <>
                      <Loader2 className="size-5 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </span>
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-base-content/10"></div>
              <span className="text-base-content/40 text-xs">new here?</span>
              <div className="flex-1 h-px bg-base-content/10"></div>
            </div>

            {/* Sign Up Link */}
            <p className="text-center text-base-content/60 text-sm">
              Don't have an account?{" "}
              <Link
                to={"/signup"}
                className="text-primary font-semibold hover:text-secondary transition-colors"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* right side */}
      <AuthImagePattern
        title="Welcome back!"
        subtitle="Sign in to continue your conversations and catch up with your message."
      />
    </div>
  );
};

export default SignUpPage;

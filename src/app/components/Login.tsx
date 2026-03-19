import { useState, FormEvent } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Alert, AlertDescription } from "./ui/alert";
import { Eye, EyeOff, AlertCircle } from "lucide-react";
import logoIcon from "figma:asset/836753629ce820953d30091a24b438821c096c54.png";

export function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        navigate("/");
      } else {
        setError("Invalid email or password. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden" style={{ backgroundColor: "#f5ede4" }}>
      {/* Faded logo background */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <img 
          src={logoIcon} 
          alt="" 
          className="h-[600px] w-[600px] object-contain opacity-[0.08]"
          aria-hidden="true"
        />
      </div>

      {/* Login card */}
      <div className="relative z-10 w-full max-w-md px-4">
        <div className="rounded-2xl bg-white p-8 shadow-2xl" style={{ borderTop: "4px solid #3d2817" }}>
          {/* Logo and title */}
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full" style={{ backgroundColor: "#c9a876" }}>
              <img src={logoIcon} alt="Amani Brew" className="h-14 w-14" />
            </div>
            <h1 className="mb-2 text-2xl" style={{ color: "#3d2817" }}>Amani Brew</h1>
            <p className="text-sm" style={{ color: "#6b5d52" }}>Premium Butchery Management</p>
          </div>

          {/* Error alert */}
          {error && (
            <Alert className="mb-6 border-red-200 bg-red-50">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800">{error}</AlertDescription>
            </Alert>
          )}

          {/* Login form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" style={{ color: "#3d2817" }}>Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@amanibrew.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
                className="border-[#c9a876]/30 focus:border-[#c9a876] focus:ring-[#c9a876]/20"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" style={{ color: "#3d2817" }}>Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  className="border-[#c9a876]/30 pr-10 focus:border-[#c9a876] focus:ring-[#c9a876]/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
                  style={{ color: "#6b5d52" }}
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full text-white transition-colors hover:opacity-90"
              style={{ backgroundColor: "#3d2817" }}
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          {/* Demo credentials */}
          <div className="mt-8 rounded-lg p-4" style={{ backgroundColor: "#f5ede4" }}>
            <p className="mb-2 text-xs" style={{ color: "#3d2817" }}>Demo Credentials:</p>
            <div className="space-y-1 text-xs" style={{ color: "#6b5d52" }}>
              <p>Admin: admin@amanibrew.com / admin123</p>
              <p>Manager: manager@amanibrew.com / manager123</p>
              <p>Staff: staff@amanibrew.com / staff123</p>
            </div>
          </div>
        </div>

        <p className="mt-4 text-center text-xs" style={{ color: "#6b5d52" }}>
          © 2026 Amani Brew. All rights reserved.
        </p>
      </div>
    </div>
  );
}

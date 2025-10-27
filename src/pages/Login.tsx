import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, LogIn, UserPlus } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import logo from "../assets/logo.jpg";

export default function Login() {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [signUpError, setSignUpError] = useState<string | null>(null);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login process
    setTimeout(() => {
      console.log("Login attempt:", { email, password });
      setIsLoading(false);
      // Navigate to dashboard after successful login
      navigate("/");
    }, 800);
  };

  const handleSignUpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSignUpError(null);

    if (!email || !password || !confirmPassword) {
      setSignUpError("Please fill all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setSignUpError("Passwords do not match.");
      return;
    }

    setIsLoading(true);

    // Simulate sign-up process
    setTimeout(() => {
      console.log("Sign up attempt:", { email, password });
      setIsLoading(false);
      // Navigate to dashboard after successful sign up
      navigate("/");
    }, 800);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-background via-muted/30 to-primary/10">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-secondary/20 to-transparent rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Login Card */}
      <Card className="w-full max-w-md mx-4 relative z-10 shadow-2xl border-primary/20 backdrop-blur-sm bg-card/95">
        <CardHeader className="space-y-4 pb-6">
          <div className="flex justify-center mb-2">
            <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-primary/30 shadow-lg">
              <img 
                src={logo} 
                alt="ImagineX Logo" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="text-center space-y-2">
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-base">
              Sign in to your ImagineX account
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={isSignUp ? handleSignUpSubmit : handleLoginSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-11 bg-background/50 border-border focus:border-primary transition-colors"
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-11 pr-10 bg-background/50 border-border focus:border-primary transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password for Sign Up */}
            {isSignUp && (
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-foreground">
                  Confirm Password
                </Label>
                <Input
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="Re-enter your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required={isSignUp}
                  className="h-11 pr-10 bg-background/50 border-border focus:border-primary transition-colors"
                />
              </div>
            )}

            {/* Remember Me & Forgot Password (only for sign-in) */}
            {!isSignUp && (
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="remember"
                    className="h-4 w-4 rounded border-border text-primary focus:ring-primary focus:ring-offset-0 cursor-pointer"
                  />
                  <label htmlFor="remember" className="text-muted-foreground cursor-pointer hover:text-foreground transition-colors">
                    Remember me
                  </label>
                </div>
                <button
                  type="button"
                  className="text-primary hover:text-primary-glow transition-colors font-medium"
                >
                  Forgot password?
                </button>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full h-11 bg-gradient-to-r from-primary to-primary-glow hover:opacity-90 transition-opacity shadow-lg shadow-primary/25"
              disabled={isLoading || (isSignUp ? !email || !password || !confirmPassword || password !== confirmPassword : !email || !password)}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>{isSignUp ? "Creating account..." : "Signing in..."}</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  {isSignUp ? <UserPlus className="h-4 w-4" /> : <LogIn className="h-4 w-4" />}
                  <span>{isSignUp ? "Sign Up" : "Sign In"}</span>
                </div>
              )}
            </Button>
            {signUpError && isSignUp && (
              <p className="text-sm text-destructive mt-1">{signUpError}</p>
            )}
          </form>

          {/* Toggle link */}
          <div className="mt-4 text-center">
            {!isSignUp ? (
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(true);
                  setSignUpError(null);
                  setConfirmPassword("");
                }}
                className="text-primary hover:text-primary-glow transition-colors font-medium"
              >
                Create a new account? <span className="text-primary-glow">Sign up</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(false);
                  setSignUpError(null);
                }}
                className="text-muted-foreground hover:text-foreground transition-colors font-medium"
              >
                Already have an Account? <span className="text-primary-glow">Sign in</span>
              </button>
            )}
          </div>

        </CardContent>
      </Card>

      {/* Footer Text */}
      <div className="absolute bottom-8 text-center text-sm text-muted-foreground">
        <p>© 2025 ImagineX. All rights reserved.</p>
      </div>
    </div>
  );
}

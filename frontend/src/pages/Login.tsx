import { useState } from "react";
import { Link, useLocation } from "wouter";
import {
  Car,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Phone,
  Shield,
  User,
  AlertCircle
} from "lucide-react";
import { SiGoogle, SiFacebook, SiApple } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useAuth, UserRole } from "@/lib/auth";

export default function Login() {
  const [, navigate] = useLocation();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [loginMethod, setLoginMethod] = useState<"email" | "phone">("email");
  const [userRole, setUserRole] = useState<UserRole>("user");
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    name: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // For signup, just navigate (not implemented)
    if (isSignUp) {
      navigate("/dashboard");
      return;
    }

    // For login, use auth context
    const username = loginMethod === "email" ? formData.email : formData.phone;
    const success = login(username, formData.password, userRole);

    if (success) {
      // Navigate based on role
      if (userRole === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } else {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/10 flex flex-col">
      <header className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2" data-testid="link-home-logo">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
            <Car className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold">CarValue</span>
        </Link>
        <ThemeToggle />
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-24">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">
              {isSignUp ? "Create Account" : "Welcome Back"}
            </CardTitle>
            <CardDescription>
              {isSignUp
                ? "Sign up to save your evaluations and set price alerts"
                : userRole === "admin"
                ? "Admin portal - Full system access"
                : "Sign in to access your dashboard and saved evaluations"
              }
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* User/Admin Toggle */}
            {!isSignUp && (
              <div className="flex gap-2 p-1 bg-muted rounded-lg">
                <button
                  type="button"
                  onClick={() => setUserRole("user")}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-md transition-all ${
                    userRole === "user"
                      ? "bg-background shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <User className="h-4 w-4" />
                  <span className="font-medium">User</span>
                </button>
                <button
                  type="button"
                  onClick={() => setUserRole("admin")}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-md transition-all ${
                    userRole === "admin"
                      ? "bg-background shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Shield className="h-4 w-4" />
                  <span className="font-medium">Admin</span>
                </button>
              </div>
            )}

            {/* Demo Credentials Info */}
            {!isSignUp && (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="text-xs">
                  <strong>Demo Credentials:</strong><br />
                  {userRole === "user" ? (
                    <>User: demo@carvalue.pk / user123</>
                  ) : (
                    <>Admin: admin@carvalue.pk / admin123</>
                  )}
                </AlertDescription>
              </Alert>
            )}

            {/* Error Message */}
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {/* Social Login */}
            <div className="grid grid-cols-3 gap-3">
              <Button variant="outline" className="h-12" data-testid="button-google-login">
                <SiGoogle className="h-5 w-5" />
              </Button>
              <Button variant="outline" className="h-12" data-testid="button-facebook-login">
                <SiFacebook className="h-5 w-5" />
              </Button>
              <Button variant="outline" className="h-12" data-testid="button-apple-login">
                <SiApple className="h-5 w-5" />
              </Button>
            </div>

            <div className="relative">
              <Separator />
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-4 text-xs text-muted-foreground">
                or continue with
              </span>
            </div>

            {/* Login Method Tabs */}
            <Tabs value={loginMethod} onValueChange={(v) => setLoginMethod(v as "email" | "phone")}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="email" className="gap-2" data-testid="tab-email">
                  <Mail className="h-4 w-4" />
                  Email
                </TabsTrigger>
                <TabsTrigger value="phone" className="gap-2" data-testid="tab-phone">
                  <Phone className="h-4 w-4" />
                  Phone
                </TabsTrigger>
              </TabsList>

              <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                {isSignUp && (
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Ahmed Khan"
                      className="h-12"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      data-testid="input-name"
                    />
                  </div>
                )}

                <TabsContent value="email" className="mt-0 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        className="h-12 pl-10"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        data-testid="input-email"
                      />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="phone" className="mt-0 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+92 300 1234567"
                        className="h-12 pl-10"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        data-testid="input-phone"
                      />
                    </div>
                  </div>
                </TabsContent>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="h-12 pl-10 pr-10"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      data-testid="input-password"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                {isSignUp && (
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="confirmPassword"
                        type={showPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        className="h-12 pl-10"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        data-testid="input-confirm-password"
                      />
                    </div>
                  </div>
                )}

                {!isSignUp && (
                  <div className="flex items-center justify-end">
                    <button type="button" className="text-sm text-primary hover:underline">
                      Forgot password?
                    </button>
                  </div>
                )}

                <Button type="submit" className="w-full h-12 gap-2" data-testid="button-submit">
                  {isSignUp ? "Create Account" : "Sign In"}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </form>
            </Tabs>

            <p className="text-center text-sm text-muted-foreground">
              {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
              <button
                type="button"
                className="text-primary hover:underline font-medium"
                onClick={() => setIsSignUp(!isSignUp)}
                data-testid="button-toggle-auth"
              >
                {isSignUp ? "Sign in" : "Sign up"}
              </button>
            </p>
          </CardContent>
        </Card>
      </main>

      <footer className="py-6 text-center text-sm text-muted-foreground">
        By continuing, you agree to our Terms of Service and Privacy Policy
      </footer>
    </div>
  );
}

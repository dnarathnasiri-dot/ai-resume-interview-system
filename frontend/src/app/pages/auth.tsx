import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { useNavigate } from "react-router";
import { Brain, CheckCircle, Mail, Lock, User, ArrowLeft, Sparkles } from "lucide-react";
import { motion } from "motion/react";

export default function AuthPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate("/dashboard");
    }, 1000);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate("/dashboard");
    }, 1000);
  };

  const benefits = [
    "AI-powered resume analysis",
    "Unlimited mock interviews",
    "Progress tracking dashboard",
    "Personalized feedback"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Branding & Benefits */}
        <motion.div
          className="hidden lg:block space-y-8"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-3 rounded-xl shadow-lg">
                <Brain className="size-10 text-white" />
              </div>
              <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                AI Interview Pro
              </span>
            </div>
            <h1 className="text-5xl font-bold text-slate-800 mb-6">
              Your Career Success Starts Here
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed">
              Join thousands of professionals who've transformed their careers with AI-powered interview preparation and resume optimization.
            </p>
          </div>

          <div className="space-y-4">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              >
                <div className="bg-gradient-to-br from-green-500 to-emerald-500 p-2 rounded-lg shadow-md">
                  <CheckCircle className="size-6 text-white" />
                </div>
                <span className="text-lg text-slate-700">{benefit}</span>
              </motion.div>
            ))}
          </div>

          <Card className="bg-gradient-to-br from-blue-600 to-indigo-600 border-0 shadow-xl text-white">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Sparkles className="size-8 shrink-0 opacity-80" />
                <div>
                  <h3 className="font-bold text-lg mb-2">Free Forever</h3>
                  <p className="text-blue-100 leading-relaxed">
                    Start using AI Interview Pro today with no credit card required. Upgrade anytime for premium features.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Right Side - Auth Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full"
        >
          {/* Mobile Logo */}
          <div className="flex lg:hidden items-center justify-center gap-3 mb-8">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-2.5 rounded-xl shadow-lg">
              <Brain className="size-8 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              AI Interview Pro
            </span>
          </div>

          <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur">
            <CardHeader className="space-y-3 pb-6">
              <CardTitle className="text-3xl">Welcome</CardTitle>
              <CardDescription className="text-base">
                Sign in to your account or create a new one to get started
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2 p-1 bg-slate-100">
                  <TabsTrigger
                    value="login"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white"
                  >
                    Login
                  </TabsTrigger>
                  <TabsTrigger
                    value="register"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white"
                  >
                    Register
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="login" className="mt-6">
                  <form onSubmit={handleLogin} className="space-y-5">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-base">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 size-5 text-slate-400" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="you@example.com"
                          className="pl-11 h-12 text-base"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-base">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 size-5 text-slate-400" />
                        <Input
                          id="password"
                          type="password"
                          placeholder="••••••••"
                          className="pl-11 h-12 text-base"
                          required
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm text-slate-600">Remember me</span>
                      </label>
                      <Button variant="link" className="text-sm px-0">
                        Forgot password?
                      </Button>
                    </div>
                    <Button
                      type="submit"
                      className="w-full h-12 text-base bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg"
                      disabled={isLoading}
                    >
                      {isLoading ? "Signing in..." : "Sign In"}
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="register" className="mt-6">
                  <form onSubmit={handleRegister} className="space-y-5">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-base">Full Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 size-5 text-slate-400" />
                        <Input
                          id="name"
                          type="text"
                          placeholder="John Doe"
                          className="pl-11 h-12 text-base"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="reg-email" className="text-base">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 size-5 text-slate-400" />
                        <Input
                          id="reg-email"
                          type="email"
                          placeholder="you@example.com"
                          className="pl-11 h-12 text-base"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="reg-password" className="text-base">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 size-5 text-slate-400" />
                        <Input
                          id="reg-password"
                          type="password"
                          placeholder="••••••••"
                          className="pl-11 h-12 text-base"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password" className="text-base">Confirm Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 size-5 text-slate-400" />
                        <Input
                          id="confirm-password"
                          type="password"
                          placeholder="••••••••"
                          className="pl-11 h-12 text-base"
                          required
                        />
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <input type="checkbox" className="rounded mt-1" required />
                      <span className="text-sm text-slate-600">
                        I agree to the Terms of Service and Privacy Policy
                      </span>
                    </div>
                    <Button
                      type="submit"
                      className="w-full h-12 text-base bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg"
                      disabled={isLoading}
                    >
                      {isLoading ? "Creating account..." : "Create Account"}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>

              <div className="mt-8 text-center">
                <Button
                  variant="ghost"
                  onClick={() => navigate("/")}
                  className="text-base"
                >
                  <ArrowLeft className="size-4 mr-2" />
                  Back to Home
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { useNavigate } from "react-router";
import { Brain, FileCheck, MessageSquare, Sparkles, TrendingUp, Users, CheckCircle, Star, Zap, Award, Target, BarChart, ArrowRight } from "lucide-react";
import { motion } from "motion/react";

export default function LandingPage() {
  const navigate = useNavigate();

  const features = [
    {
      icon: FileCheck,
      title: "AI Resume Analysis",
      description: "Get instant feedback on your resume with AI-powered scoring and suggestions",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: MessageSquare,
      title: "Mock Interviews",
      description: "Practice with AI-generated interview questions tailored to your role",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: TrendingUp,
      title: "Score Tracking",
      description: "Monitor your progress and see improvements over time",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: Brain,
      title: "Smart Insights",
      description: "Receive personalized recommendations to enhance your job search",
      gradient: "from-indigo-500 to-purple-500"
    },
    {
      icon: Users,
      title: "Industry Standards",
      description: "Benchmark against industry best practices and requirements",
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: Sparkles,
      title: "ATS Optimization",
      description: "Ensure your resume passes Applicant Tracking Systems",
      gradient: "from-pink-500 to-rose-500"
    }
  ];

  const stats = [
    { icon: Users, value: "10,000+", label: "Active Users", gradient: "from-blue-500 to-cyan-500" },
    { icon: Award, value: "95%", label: "Success Rate", gradient: "from-green-500 to-emerald-500" },
    { icon: Star, value: "4.9/5", label: "User Rating", gradient: "from-yellow-500 to-orange-500" },
    { icon: Target, value: "50,000+", label: "Interviews", gradient: "from-purple-500 to-pink-500" }
  ];

  const benefits = [
    "AI-powered resume scoring in seconds",
    "12+ diverse interview question categories",
    "Real-time feedback and improvements",
    "Track progress over time with analytics",
    "Mobile-friendly interface",
    "Industry-standard best practices"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Navigation */}
      <nav className="border-b bg-white/90 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-2.5 rounded-xl shadow-lg">
              <Brain className="size-7 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              AI Interview Pro
            </span>
          </div>
          <Button onClick={() => navigate("/auth")} size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md">
            Get Started Free
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-28">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center space-y-8"
          >
            <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 px-4 py-2 text-sm font-medium border-0">
              <Sparkles className="size-4 mr-2" />
              AI-Powered Career Assistant
            </Badge>

            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Land Your Dream Job
              </span>
              <br />
              <span className="text-slate-800">with AI Interview Prep</span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Get instant resume feedback, practice interviews with AI, and receive personalized insights to boost your career prospects.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Button
                size="lg"
                onClick={() => navigate("/auth")}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-lg px-8 py-6 shadow-xl hover:shadow-2xl transition-all"
              >
                Start Free Trial
                <ArrowRight className="size-5 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate("/auth")}
                className="text-lg px-8 py-6 border-2 hover:bg-slate-50"
              >
                Sign In
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-6 pt-8 text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <CheckCircle className="size-5 text-green-600" />
                <span>Free to start</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="size-5 text-green-600" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="size-5 text-green-600" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats Cards */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-20 max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          {stats.map((stat, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-white/80 backdrop-blur">
              <CardContent className="p-6 text-center">
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${stat.gradient} mb-3`}>
                  <stat.icon className="size-6 text-white" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-slate-800 mb-1">{stat.value}</div>
                <div className="text-sm text-slate-600">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="bg-indigo-100 text-indigo-700 hover:bg-indigo-200 px-4 py-2 mb-4 border-0">
                Features
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-800">
                Everything You Need to Succeed
              </h2>
              <p className="text-slate-600 text-xl max-w-2xl mx-auto">
                Comprehensive tools to prepare you for every step of your job search journey
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-2xl transition-all duration-300 border-0 bg-white/80 backdrop-blur group">
                  <CardContent className="p-8">
                    <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${feature.gradient} mb-5 group-hover:scale-110 transition-transform`}>
                      <feature.icon className="size-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-slate-800">{feature.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="container mx-auto px-4 py-20 bg-white/50">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <div>
              <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-200 px-4 py-2 mb-4 border-0">
                Why Choose Us
              </Badge>
              <h2 className="text-4xl font-bold mb-6 text-slate-800">
                Your Success is Our Mission
              </h2>
              <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                We combine cutting-edge AI technology with industry expertise to give you the competitive edge you need in today's job market.
              </p>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="bg-gradient-to-br from-green-500 to-emerald-500 p-1 rounded-full mt-0.5">
                      <CheckCircle className="size-5 text-white" />
                    </div>
                    <span className="text-slate-700 text-lg">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-gradient-to-br from-blue-500 to-cyan-500 border-0 shadow-xl text-white p-6">
                <BarChart className="size-12 mb-4 opacity-80" />
                <div className="text-3xl font-bold mb-2">78%</div>
                <div className="text-sm opacity-90">Avg Resume Score</div>
              </Card>
              <Card className="bg-gradient-to-br from-purple-500 to-pink-500 border-0 shadow-xl text-white p-6 mt-8">
                <Zap className="size-12 mb-4 opacity-80" />
                <div className="text-3xl font-bold mb-2">3 sec</div>
                <div className="text-sm opacity-90">Analysis Time</div>
              </Card>
              <Card className="bg-gradient-to-br from-green-500 to-emerald-500 border-0 shadow-xl text-white p-6 -mt-8">
                <Target className="size-12 mb-4 opacity-80" />
                <div className="text-3xl font-bold mb-2">12+</div>
                <div className="text-sm opacity-90">Question Types</div>
              </Card>
              <Card className="bg-gradient-to-br from-orange-500 to-red-500 border-0 shadow-xl text-white p-6">
                <Award className="size-12 mb-4 opacity-80" />
                <div className="text-3xl font-bold mb-2">100%</div>
                <div className="text-sm opacity-90">ATS Compatible</div>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          className="max-w-4xl mx-auto bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-12 md:p-16 text-center text-white shadow-2xl"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your Career?
          </h2>
          <p className="text-xl mb-10 text-blue-100 max-w-2xl mx-auto leading-relaxed">
            Join thousands of successful candidates who've landed their dream jobs with AI Interview Pro
          </p>
          <Button
            size="lg"
            onClick={() => navigate("/auth")}
            className="bg-white text-indigo-600 hover:bg-blue-50 text-lg px-10 py-6 shadow-xl"
          >
            Get Started Now - It's Free
            <ArrowRight className="size-5 ml-2" />
          </Button>
          <p className="text-sm text-blue-200 mt-6">No credit card required • Start in 30 seconds</p>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white/90 backdrop-blur-md py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-2 rounded-xl">
                <Brain className="size-6 text-white" />
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                AI Interview Pro
              </span>
            </div>
            <div className="text-slate-600">
              &copy; 2026 AI Interview Pro. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Progress } from "../components/ui/progress";
import { useNavigate } from "react-router";
import { Brain, FileText, MessageSquare, TrendingUp, Upload, LogOut, Menu, User } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "../components/ui/sheet";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

export default function DashboardPage() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Mock user data
  const userData = {
    name: "John Doe",
    email: "john@example.com",
    resumeScore: 78,
    interviewsCompleted: 12,
    avgInterviewScore: 82,
  };

  const recentActivity = [
    { id: 1, type: "resume", title: "Resume uploaded", score: 78, date: "2 hours ago" },
    { id: 2, type: "interview", title: "Frontend Developer Interview", score: 85, date: "1 day ago" },
    { id: 3, type: "interview", title: "Behavioral Interview", score: 79, date: "2 days ago" },
    { id: 4, type: "resume", title: "Resume updated", score: 75, date: "3 days ago" },
  ];

  const progressData = [
    { week: "Week 1", resumeScore: 65, interviewScore: 70 },
    { week: "Week 2", resumeScore: 68, interviewScore: 73 },
    { week: "Week 3", resumeScore: 72, interviewScore: 76 },
    { week: "Week 4", resumeScore: 75, interviewScore: 79 },
    { week: "Week 5", resumeScore: 78, interviewScore: 82 },
  ];

  const stats = [
    {
      title: "Resume Score",
      value: `${userData.resumeScore}%`,
      icon: FileText,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      progress: userData.resumeScore,
    },
    {
      title: "Interviews Completed",
      value: userData.interviewsCompleted,
      icon: MessageSquare,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Avg Interview Score",
      value: `${userData.avgInterviewScore}%`,
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      progress: userData.avgInterviewScore,
    },
  ];

  const quickActions = [
    {
      title: "Upload Resume",
      description: "Get AI-powered feedback on your resume",
      icon: Upload,
      action: () => navigate("/resume-upload"),
      color: "bg-blue-600 hover:bg-blue-700",
    },
    {
      title: "Start Interview",
      description: "Practice with AI-generated questions",
      icon: MessageSquare,
      action: () => navigate("/interview"),
      color: "bg-purple-600 hover:bg-purple-700",
    },
  ];

  const NavigationContent = () => (
    <>
      <div className="flex items-center gap-3 mb-10">
        <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-2.5 rounded-xl shadow-lg">
          <Brain className="size-7 text-white" />
        </div>
        <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          AI Interview Pro
        </span>
      </div>

      <div className="space-y-2">
        <Button
          variant="secondary"
          className="w-full justify-start bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-md"
          onClick={() => navigate("/dashboard")}
        >
          Dashboard
        </Button>
        <Button variant="ghost" className="w-full justify-start hover:bg-blue-50" onClick={() => navigate("/resume-upload")}>
          <Upload className="size-4 mr-2" />
          Resume Upload
        </Button>
        <Button variant="ghost" className="w-full justify-start hover:bg-blue-50" onClick={() => navigate("/interview")}>
          <MessageSquare className="size-4 mr-2" />
          Interview
        </Button>
        <Button variant="ghost" className="w-full justify-start hover:bg-blue-50" onClick={() => navigate("/profile")}>
          <User className="size-4 mr-2" />
          Profile
        </Button>
      </div>

      <div className="mt-auto pt-8">
        <Card className="bg-gradient-to-br from-slate-50 to-blue-50 border-slate-200 shadow-md">
          <CardContent className="p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-2 rounded-lg text-white font-bold text-sm">
                {userData.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-slate-800 truncate">{userData.name}</p>
                <p className="text-xs text-slate-600 truncate">{userData.email}</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="w-full border-slate-300 hover:bg-slate-100"
              onClick={() => navigate("/")}
            >
              <LogOut className="size-4 mr-2" />
              Sign Out
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="flex">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex flex-col w-72 border-r bg-white/90 backdrop-blur-md shadow-sm p-6 min-h-screen sticky top-0">
          <NavigationContent />
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-h-screen">
          {/* Mobile Header */}
          <div className="lg:hidden border-b bg-white/90 backdrop-blur-md shadow-sm p-4 flex items-center justify-between sticky top-0 z-40">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-1.5 rounded-lg">
                <Brain className="size-5 text-white" />
              </div>
              <span className="font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">AI Interview Pro</span>
            </div>
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="size-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-6">
                <NavigationContent />
              </SheetContent>
            </Sheet>
          </div>

          <div className="p-4 md:p-8">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-10"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Welcome back, {userData.name}!
              </h1>
              <p className="text-slate-600 text-lg">Here's your career progress overview</p>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur group">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className={`p-4 rounded-xl ${stat.bgColor} group-hover:scale-110 transition-transform shadow-md`}>
                          <stat.icon className={`size-7 ${stat.color}`} />
                        </div>
                        <div className={`text-3xl font-bold ${stat.color}`}>
                          {stat.value}
                        </div>
                      </div>
                      <p className="font-medium text-slate-700 mb-2">{stat.title}</p>
                      {stat.progress !== undefined && (
                        <Progress value={stat.progress} className="h-2.5" />
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mb-8"
            >
              <h2 className="text-2xl font-bold mb-6 text-slate-800">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {quickActions.map((action, index) => (
                  <Card
                    key={index}
                    className="cursor-pointer hover:shadow-2xl transition-all duration-300 border-0 bg-white/80 backdrop-blur group overflow-hidden relative"
                    onClick={action.action}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <CardContent className="p-8 relative z-10">
                      <div className={`p-4 rounded-2xl ${action.color} w-fit mb-5 shadow-lg group-hover:scale-110 transition-transform`}>
                        <action.icon className="size-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold mb-3 text-slate-800">{action.title}</h3>
                      <p className="text-slate-600 leading-relaxed">{action.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>

            {/* Progress Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mb-8"
            >
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur">
                <CardHeader>
                  <CardTitle className="text-2xl text-slate-800">Progress Over Time</CardTitle>
                  <CardDescription className="text-base">Track your improvement in resume and interview scores</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={progressData}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200" />
                        <XAxis
                          dataKey="week"
                          className="text-sm"
                          tick={{ fill: '#64748b' }}
                        />
                        <YAxis
                          className="text-sm"
                          tick={{ fill: '#64748b' }}
                          domain={[0, 100]}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: 'white',
                            border: '1px solid #e2e8f0',
                            borderRadius: '12px',
                            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                          }}
                        />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="resumeScore"
                          stroke="#3b82f6"
                          strokeWidth={3}
                          name="Resume Score"
                          dot={{ fill: '#3b82f6', r: 5 }}
                          activeDot={{ r: 7 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="interviewScore"
                          stroke="#9333ea"
                          strokeWidth={3}
                          name="Interview Score"
                          dot={{ fill: '#9333ea', r: 5 }}
                          activeDot={{ r: 7 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur">
                <CardHeader>
                  <CardTitle className="text-2xl text-slate-800">Recent Activity</CardTitle>
                  <CardDescription className="text-base">Your latest resume uploads and interviews</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentActivity.map((activity) => (
                      <div
                        key={activity.id}
                        className="flex items-center justify-between p-5 border-0 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200 bg-slate-50 shadow-sm"
                      >
                        <div className="flex items-center gap-4">
                          <div className={`p-3 rounded-xl shadow-md ${
                            activity.type === "resume"
                              ? "bg-gradient-to-br from-blue-500 to-cyan-500"
                              : "bg-gradient-to-br from-purple-500 to-pink-500"
                          }`}>
                            {activity.type === "resume" ? (
                              <FileText className="size-6 text-white" />
                            ) : (
                              <MessageSquare className="size-6 text-white" />
                            )}
                          </div>
                          <div>
                            <p className="font-semibold text-slate-800">{activity.title}</p>
                            <p className="text-sm text-slate-600">{activity.date}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`text-2xl font-bold ${
                            activity.score >= 80 ? "text-green-600" :
                            activity.score >= 60 ? "text-yellow-600" : "text-red-600"
                          }`}>
                            {activity.score}%
                          </div>
                          <p className="text-xs text-slate-600 font-medium">Score</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}

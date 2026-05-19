import { useState } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { Badge } from "../components/ui/badge";
import { useNavigate } from "react-router";
import {
  Brain, ArrowLeft, User, Mail, Calendar,
  TrendingUp, FileText, MessageSquare, Settings,
  Menu, Edit, Save
} from "lucide-react";
import { motion } from "motion/react";
import { Sheet, SheetContent, SheetTrigger } from "../components/ui/sheet";

export default function ProfilePage() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    joinDate: "January 2024",
  });

  const interviewHistory = [
    { id: 1, date: "May 15, 2026", type: "Technical Interview", score: 87, questions: 12 },
    { id: 2, date: "May 14, 2026", type: "Behavioral Interview", score: 82, questions: 10 },
    { id: 3, date: "May 12, 2026", type: "General Interview", score: 79, questions: 8 },
    { id: 4, date: "May 10, 2026", type: "Leadership Interview", score: 85, questions: 12 },
    { id: 5, date: "May 8, 2026", type: "Technical Interview", score: 90, questions: 12 },
  ];

  const resumeHistory = [
    { id: 1, date: "May 16, 2026", version: "Resume_v5.pdf", score: 78 },
    { id: 2, date: "May 10, 2026", version: "Resume_v4.pdf", score: 75 },
    { id: 3, date: "May 5, 2026", version: "Resume_v3.pdf", score: 72 },
    { id: 4, date: "April 28, 2026", version: "Resume_v2.pdf", score: 68 },
  ];

  const stats = {
    totalInterviews: 15,
    avgInterviewScore: 84,
    totalResumes: 8,
    currentResumeScore: 78,
    improvementRate: 12,
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600 bg-green-100";
    if (score >= 60) return "text-yellow-600 bg-yellow-100";
    return "text-red-600 bg-red-100";
  };

  const handleSave = () => {
    setIsEditing(false);
    // In a real app, this would save to backend
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="border-b bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/dashboard")}
              className="lg:hidden hover:bg-blue-50"
            >
              <ArrowLeft className="size-5" />
            </Button>
            <Button
              variant="ghost"
              onClick={() => navigate("/dashboard")}
              className="hidden lg:flex hover:bg-blue-50"
            >
              <ArrowLeft className="size-4 mr-2" />
              Back to Dashboard
            </Button>
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-2 rounded-xl shadow-md">
                <Brain className="size-6 text-white" />
              </div>
              <span className="font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent hidden sm:inline text-lg">
                AI Interview Pro
              </span>
            </div>
          </div>
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="size-6" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="space-y-4 mt-8">
                <Button variant="ghost" className="w-full justify-start" onClick={() => navigate("/dashboard")}>
                  Dashboard
                </Button>
                <Button variant="ghost" className="w-full justify-start" onClick={() => navigate("/resume-upload")}>
                  Resume Upload
                </Button>
                <Button variant="ghost" className="w-full justify-start" onClick={() => navigate("/interview")}>
                  Interview
                </Button>
                <Button variant="secondary" className="w-full justify-start">
                  Profile
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Profile Header */}
          <Card className="mb-8 border-0 shadow-xl bg-white/80 backdrop-blur">
            <CardContent className="pt-8">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="relative">
                  <Avatar className="size-28 border-4 border-white shadow-xl">
                    <AvatarFallback className="text-3xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white font-bold">
                      {userData.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-2 -right-2 bg-gradient-to-br from-green-500 to-emerald-500 p-2 rounded-full shadow-lg">
                    <TrendingUp className="size-5 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                    {userData.name}
                  </h1>
                  <p className="text-slate-600 mb-4 text-lg">{userData.email}</p>
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2 text-slate-600 bg-slate-100 px-3 py-2 rounded-lg">
                      <Calendar className="size-4" />
                      <span className="text-sm font-medium">Joined {userData.joinDate}</span>
                    </div>
                    <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 text-sm shadow-md">
                      <TrendingUp className="size-4 mr-1" />
                      {stats.improvementRate}% improvement
                    </Badge>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-5 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 shadow-md">
                    <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-2 rounded-lg mx-auto w-fit mb-3 shadow-md">
                      <MessageSquare className="size-6 text-white" />
                    </div>
                    <p className="text-3xl font-bold text-blue-600">{stats.totalInterviews}</p>
                    <p className="text-xs text-slate-600 font-medium">Interviews</p>
                  </div>
                  <div className="text-center p-5 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 shadow-md">
                    <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-2 rounded-lg mx-auto w-fit mb-3 shadow-md">
                      <FileText className="size-6 text-white" />
                    </div>
                    <p className="text-3xl font-bold text-purple-600">{stats.totalResumes}</p>
                    <p className="text-xs text-slate-600 font-medium">Resumes</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabs */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 p-1 bg-white/80 backdrop-blur shadow-md h-14">
              <TabsTrigger
                value="overview"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white data-[state=active]:shadow-lg text-base"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="history"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white data-[state=active]:shadow-lg text-base"
              >
                History
              </TabsTrigger>
              <TabsTrigger
                value="settings"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white data-[state=active]:shadow-lg text-base"
              >
                Settings
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Performance Stats */}
                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur">
                  <CardHeader>
                    <CardTitle className="text-2xl text-slate-800">Performance Overview</CardTitle>
                    <CardDescription className="text-base">Your recent performance metrics</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-5 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 shadow-sm">
                      <div className="flex items-center gap-3">
                        <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-2 rounded-lg shadow-md">
                          <MessageSquare className="size-5 text-white" />
                        </div>
                        <span className="font-semibold text-slate-700">Avg Interview Score</span>
                      </div>
                      <span className="text-2xl font-bold text-green-600">{stats.avgInterviewScore}%</span>
                    </div>
                    <div className="flex items-center justify-between p-5 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 shadow-sm">
                      <div className="flex items-center gap-3">
                        <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-2 rounded-lg shadow-md">
                          <FileText className="size-5 text-white" />
                        </div>
                        <span className="font-semibold text-slate-700">Current Resume Score</span>
                      </div>
                      <span className="text-2xl font-bold text-yellow-600">{stats.currentResumeScore}%</span>
                    </div>
                    <div className="flex items-center justify-between p-5 rounded-xl bg-gradient-to-br from-green-50 to-green-100 shadow-sm">
                      <div className="flex items-center gap-3">
                        <div className="bg-gradient-to-br from-green-500 to-emerald-500 p-2 rounded-lg shadow-md">
                          <TrendingUp className="size-5 text-white" />
                        </div>
                        <span className="font-semibold text-slate-700">Improvement Rate</span>
                      </div>
                      <span className="text-2xl font-bold text-green-600">+{stats.improvementRate}%</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur">
                  <CardHeader>
                    <CardTitle className="text-2xl text-slate-800">Recent Activity</CardTitle>
                    <CardDescription className="text-base">Your latest accomplishments</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {interviewHistory.slice(0, 3).map((interview, index) => (
                      <motion.div
                        key={interview.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center justify-between p-4 rounded-xl bg-slate-50 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all shadow-sm"
                      >
                        <div>
                          <p className="font-semibold text-slate-800">{interview.type}</p>
                          <p className="text-sm text-slate-600">{interview.date}</p>
                        </div>
                        <Badge className={`${getScoreColor(interview.score)} px-3 py-1 text-sm font-bold`}>
                          {interview.score}%
                        </Badge>
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* History Tab */}
            <TabsContent value="history" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Interview History */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="size-5" />
                      Interview History
                    </CardTitle>
                    <CardDescription>All your completed interviews</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {interviewHistory.map((interview) => (
                        <div key={interview.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <p className="font-medium">{interview.type}</p>
                              <p className="text-sm text-gray-600">{interview.date}</p>
                            </div>
                            <Badge className={getScoreColor(interview.score)}>
                              {interview.score}%
                            </Badge>
                          </div>
                          <p className="text-xs text-gray-600">{interview.questions} questions answered</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Resume History */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="size-5" />
                      Resume History
                    </CardTitle>
                    <CardDescription>Track your resume improvements</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {resumeHistory.map((resume, index) => (
                        <div key={resume.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <p className="font-medium">{resume.version}</p>
                              <p className="text-sm text-gray-600">{resume.date}</p>
                            </div>
                            <div className="text-right">
                              <Badge className={getScoreColor(resume.score)}>
                                {resume.score}%
                              </Badge>
                              {index > 0 && resume.score > resumeHistory[index - 1].score && (
                                <p className="text-xs text-green-600 mt-1">
                                  +{resume.score - resumeHistory[index - 1].score} points
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Settings className="size-5" />
                        Account Settings
                      </CardTitle>
                      <CardDescription>Manage your profile information</CardDescription>
                    </div>
                    {isEditing ? (
                      <Button onClick={handleSave} size="sm">
                        <Save className="size-4 mr-2" />
                        Save Changes
                      </Button>
                    ) : (
                      <Button onClick={() => setIsEditing(true)} variant="outline" size="sm">
                        <Edit className="size-4 mr-2" />
                        Edit Profile
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <div className="flex items-center gap-2">
                        <User className="size-4 text-gray-400" />
                        <Input
                          id="name"
                          value={userData.name}
                          onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <div className="flex items-center gap-2">
                        <Mail className="size-4 text-gray-400" />
                        <Input
                          id="email"
                          type="email"
                          value={userData.email}
                          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={userData.phone}
                        onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={userData.location}
                        onChange={(e) => setUserData({ ...userData, location: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div className="pt-6 border-t space-y-4">
                    <h3 className="font-semibold">Account Actions</h3>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button variant="outline" className="flex-1">
                        Change Password
                      </Button>
                      <Button variant="outline" className="flex-1">
                        Download Data
                      </Button>
                      <Button variant="destructive" className="flex-1">
                        Delete Account
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}

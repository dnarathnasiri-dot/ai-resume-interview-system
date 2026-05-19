import { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Progress } from "../components/ui/progress";
import { Badge } from "../components/ui/badge";
import { Textarea } from "../components/ui/textarea";
import { useNavigate } from "react-router";
import { 
  Brain, ArrowLeft, CheckCircle2, Clock, 
  MessageSquare, TrendingUp, Menu, Play, SkipForward 
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Sheet, SheetContent, SheetTrigger } from "../components/ui/sheet";

export default function InterviewPage() {
  const navigate = useNavigate();
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answer, setAnswer] = useState("");
  const [answers, setAnswers] = useState<string[]>([]);
  const [completed, setCompleted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [calculatedScore, setCalculatedScore] = useState(0);

  const interviewQuestions = [
    {
      id: 1,
      question: "Tell me about yourself and your background.",
      category: "Introduction",
      tips: "Focus on professional experience and relevant skills. Keep it concise (2-3 minutes).",
    },
    {
      id: 2,
      question: "What are your greatest strengths as a professional?",
      category: "Behavioral",
      tips: "Provide specific examples and relate them to the job requirements.",
    },
    {
      id: 3,
      question: "Describe a time when you had to work with a difficult team member. How did you handle it?",
      category: "Behavioral",
      tips: "Show emotional intelligence and conflict resolution skills.",
    },
    {
      id: 4,
      question: "Explain a complex technical concept to someone without a technical background.",
      category: "Technical",
      tips: "Use analogies and avoid jargon. Demonstrate communication skills.",
    },
    {
      id: 5,
      question: "Describe a challenging project you worked on and how you overcame obstacles.",
      category: "Technical",
      tips: "Use the STAR method: Situation, Task, Action, Result.",
    },
    {
      id: 6,
      question: "Tell me about a time when you failed. What did you learn from it?",
      category: "Behavioral",
      tips: "Show self-awareness and growth mindset. Focus on lessons learned.",
    },
    {
      id: 7,
      question: "How do you prioritize tasks when everything seems urgent?",
      category: "Problem Solving",
      tips: "Discuss your time management system and decision-making process.",
    },
    {
      id: 8,
      question: "Where do you see yourself in 5 years?",
      category: "Career Goals",
      tips: "Show ambition while aligning with the company's growth trajectory.",
    },
    {
      id: 9,
      question: "Why do you want to work for our company?",
      category: "Company Fit",
      tips: "Demonstrate knowledge of the company and explain how you can contribute.",
    },
    {
      id: 10,
      question: "Describe your ideal work environment and management style.",
      category: "Company Fit",
      tips: "Be honest but flexible. Show you can adapt to different environments.",
    },
    {
      id: 11,
      question: "What's your approach to learning new technologies or skills?",
      category: "Growth Mindset",
      tips: "Provide concrete examples of recent learning experiences.",
    },
    {
      id: 12,
      question: "Do you have any questions for us?",
      category: "Closing",
      tips: "Always prepare thoughtful questions about the role, team, and company.",
    },
  ];

  const mockResults = {
    overallScore: 85,
    breakdown: [
      { category: "Communication", score: 88 },
      { category: "Technical Knowledge", score: 82 },
      { category: "Problem Solving", score: 85 },
      { category: "Cultural Fit", score: 86 },
    ],
    feedback: [
      { type: "strength", text: "Clear and concise responses" },
      { type: "strength", text: "Good use of specific examples" },
      { type: "improvement", text: "Add more quantifiable achievements" },
      { type: "improvement", text: "Expand on technical details" },
    ],
  };

  useEffect(() => {
    if (started && !completed && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [started, timeLeft, completed]);

  const handleStart = () => {
    setStarted(true);
    setTimeLeft(120);
  };

  const handleNext = () => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);
    setAnswer("");

    if (currentQuestion < interviewQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setTimeLeft(120); // Increased to 2 minutes per question
    } else {
      const score = calculateScore(newAnswers);
      setCalculatedScore(score);
      setCompleted(true);
    }
  };

  const handleSkip = () => {
    setAnswers([...answers, ""]);
    setAnswer("");

    if (currentQuestion < interviewQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setTimeLeft(120);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const calculateScore = (allAnswers: string[]) => {
    // Simple scoring algorithm based on answer quality
    let totalScore = 0;

    allAnswers.forEach((ans, index) => {
      if (!ans.trim()) {
        // Skipped question = 0 points
        totalScore += 0;
      } else {
        const wordCount = ans.trim().split(/\s+/).length;
        let questionScore = 50; // Base score for answering

        // Add points for answer length (up to 30 points)
        if (wordCount >= 100) questionScore += 30;
        else if (wordCount >= 50) questionScore += 20;
        else if (wordCount >= 20) questionScore += 10;

        // Add points for using keywords (up to 20 points)
        const keywords = ['experience', 'project', 'team', 'solution', 'result', 'learned', 'improved', 'developed', 'managed', 'achieved'];
        const keywordCount = keywords.filter(kw => ans.toLowerCase().includes(kw)).length;
        questionScore += Math.min(keywordCount * 4, 20);

        totalScore += Math.min(questionScore, 100);
      }
    });

    return Math.round(totalScore / allAnswers.length);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
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
                <Button variant="secondary" className="w-full justify-start">
                  Interview
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <AnimatePresence mode="wait">
          {!started ? (
            // Start Screen
            <motion.div
              key="start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                  AI Mock Interview
                </h1>
                <p className="text-slate-600 text-lg">Practice with AI-generated interview questions</p>
              </div>

              <Card className="mb-8 border-0 shadow-xl bg-white/80 backdrop-blur">
                <CardHeader>
                  <CardTitle className="text-2xl text-slate-800">Interview Details</CardTitle>
                  <CardDescription className="text-base">
                    This mock interview will help you prepare for real interviews
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div className="flex items-center gap-4 p-5 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 shadow-md">
                      <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-3 rounded-xl shadow-md">
                        <MessageSquare className="size-7 text-white" />
                      </div>
                      <div>
                        <p className="text-3xl font-bold text-blue-600">{interviewQuestions.length}</p>
                        <p className="text-sm text-slate-600 font-medium">Questions</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-5 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 shadow-md">
                      <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-3 rounded-xl shadow-md">
                        <Clock className="size-7 text-white" />
                      </div>
                      <div>
                        <p className="text-3xl font-bold text-purple-600">~20</p>
                        <p className="text-sm text-slate-600 font-medium">Minutes</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-5 rounded-xl bg-gradient-to-br from-green-50 to-green-100 shadow-md">
                      <div className="bg-gradient-to-br from-green-500 to-emerald-500 p-3 rounded-xl shadow-md">
                        <TrendingUp className="size-7 text-white" />
                      </div>
                      <div>
                        <p className="text-3xl font-bold text-green-600">AI</p>
                        <p className="text-sm text-slate-600 font-medium">Powered</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 pt-4">
                    <h3 className="font-semibold">Interview Topics:</h3>
                    <div className="flex flex-wrap gap-2">
                      {Array.from(new Set(interviewQuestions.map(q => q.category))).map((category, index) => (
                        <Badge key={index} variant="secondary">{category}</Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3 pt-4">
                    <h3 className="font-semibold">Tips for Success:</h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="size-4 text-green-600 mt-0.5 shrink-0" />
                        <span>Take your time to think before answering</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="size-4 text-green-600 mt-0.5 shrink-0" />
                        <span>Use specific examples from your experience</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="size-4 text-green-600 mt-0.5 shrink-0" />
                        <span>Be concise and stay on topic</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="size-4 text-green-600 mt-0.5 shrink-0" />
                        <span>Show enthusiasm and confidence</span>
                      </li>
                    </ul>
                  </div>

                  <Button
                    className="w-full mt-8 h-14 text-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all"
                    size="lg"
                    onClick={handleStart}
                  >
                    <Play className="size-6 mr-2" />
                    Start Interview
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ) : !completed ? (
            // Interview Questions
            <motion.div
              key="interview"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">
                    Question {currentQuestion + 1} of {interviewQuestions.length}
                  </span>
                  <Badge variant={timeLeft < 10 ? "destructive" : "secondary"}>
                    <Clock className="size-3 mr-1" />
                    {formatTime(timeLeft)}
                  </Badge>
                </div>
                <Progress value={((currentQuestion + 1) / interviewQuestions.length) * 100} className="h-2" />
              </div>

              <Card className="mb-6 border-0 shadow-xl bg-white/80 backdrop-blur">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <Badge className="mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-1.5 text-sm">
                        {interviewQuestions[currentQuestion].category}
                      </Badge>
                      <CardTitle className="text-2xl md:text-3xl leading-relaxed text-slate-800">
                        {interviewQuestions[currentQuestion].question}
                      </CardTitle>
                    </div>
                    <div className="bg-gradient-to-br from-blue-500 to-indigo-500 p-3 rounded-xl shadow-lg">
                      <MessageSquare className="size-8 text-white shrink-0" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-5 mb-6 shadow-sm">
                    <p className="text-blue-900 leading-relaxed">
                      <strong className="font-bold">💡 Tip:</strong> {interviewQuestions[currentQuestion].tips}
                    </p>
                  </div>

                  <Textarea
                    placeholder="Type your answer here..."
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    className="min-h-[200px] md:min-h-[300px] text-base"
                  />

                  <div className="flex flex-col sm:flex-row gap-4 mt-8">
                    <Button
                      variant="outline"
                      onClick={handleSkip}
                      className="flex-1 h-12 text-base border-2 hover:bg-slate-100"
                    >
                      <SkipForward className="size-5 mr-2" />
                      Skip Question
                    </Button>
                    <Button
                      onClick={handleNext}
                      disabled={!answer.trim()}
                      className="flex-1 h-12 text-base bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg"
                    >
                      {currentQuestion < interviewQuestions.length - 1 ? "Next Question" : "Finish Interview"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            // Results Screen
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-center mb-10">
                <div className="bg-gradient-to-br from-green-500 to-emerald-500 p-5 rounded-full w-fit mx-auto mb-6 shadow-xl">
                  <CheckCircle2 className="size-16 text-white" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                  Interview Complete!
                </h1>
                <p className="text-slate-600 text-lg">Here's how you performed</p>
              </div>

              <Card className="mb-8 border-0 shadow-xl bg-white/80 backdrop-blur">
                <CardContent className="p-10">
                  <div className="text-center mb-10">
                    <p className="text-slate-600 mb-4 text-lg font-medium">Overall Performance</p>
                    <div className={`text-7xl md:text-8xl font-bold ${getScoreColor(calculatedScore)} mb-6`}>
                      {calculatedScore}
                    </div>
                    <Progress value={calculatedScore} className="h-4 mb-6" />
                    <p className="text-slate-600 font-medium">
                      {answers.filter(a => a.trim()).length} of {interviewQuestions.length} questions answered
                    </p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    {mockResults.breakdown.map((item, index) => {
                      // Adjust scores based on calculated score
                      const adjustedScore = Math.round(item.score * (calculatedScore / mockResults.overallScore));
                      return (
                        <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                          <span className="text-sm font-medium">{item.category}</span>
                          <span className={`text-lg font-bold ${getScoreColor(adjustedScore)}`}>
                            {adjustedScore}%
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle2 className="size-5 text-green-600" />
                      Strengths
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {mockResults.feedback
                        .filter(f => f.type === "strength")
                        .map((item, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-green-600 mt-1">•</span>
                            <span className="text-sm">{item.text}</span>
                          </li>
                        ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="size-5 text-yellow-600" />
                      Areas to Improve
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {mockResults.feedback
                        .filter(f => f.type === "improvement")
                        .map((item, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-yellow-600 mt-1">•</span>
                            <span className="text-sm">{item.text}</span>
                          </li>
                        ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="outline" onClick={() => window.location.reload()} className="flex-1">
                  Try Another Interview
                </Button>
                <Button onClick={() => navigate("/dashboard")} className="flex-1">
                  Back to Dashboard
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

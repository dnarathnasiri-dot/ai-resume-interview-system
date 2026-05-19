import { useState } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Progress } from "../components/ui/progress";
import { Badge } from "../components/ui/badge";
import { useNavigate } from "react-router";
import {
  Brain, Upload, FileText, CheckCircle2, XCircle,
  AlertCircle, ArrowLeft, Download, Menu, Sparkles
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Sheet, SheetContent, SheetTrigger } from "../components/ui/sheet";
import { AnalyzingAnimation } from "../components/LoadingSpinner";

export default function ResumeUploadPage() {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Mock analysis results
  const analysisResults = {
    overallScore: 78,
    sections: [
      { name: "Contact Information", score: 95, status: "good" },
      { name: "Professional Summary", score: 85, status: "good" },
      { name: "Work Experience", score: 72, status: "warning" },
      { name: "Skills", score: 80, status: "good" },
      { name: "Education", score: 90, status: "good" },
      { name: "ATS Compatibility", score: 65, status: "error" },
    ],
    strengths: [
      "Clear and concise contact information",
      "Strong education credentials",
      "Well-structured skills section",
      "Consistent formatting throughout"
    ],
    improvements: [
      "Add more quantifiable achievements in work experience",
      "Include relevant keywords for ATS optimization",
      "Expand technical skills section",
      "Add action verbs to job descriptions"
    ],
    keywords: [
      { word: "JavaScript", present: true },
      { word: "React", present: true },
      { word: "Node.js", present: false },
      { word: "TypeScript", present: true },
      { word: "AWS", present: false },
      { word: "Docker", present: false },
    ]
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setAnalyzed(false);
    }
  };

  const handleAnalyze = () => {
    if (!file) return;
    
    setAnalyzing(true);
    // Mock analysis delay
    setTimeout(() => {
      setAnalyzing(false);
      setAnalyzed(true);
    }, 3000);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
      setAnalyzed(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "good":
        return <CheckCircle2 className="size-5 text-green-600" />;
      case "warning":
        return <AlertCircle className="size-5 text-yellow-600" />;
      case "error":
        return <XCircle className="size-5 text-red-600" />;
      default:
        return null;
    }
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
                <Button variant="secondary" className="w-full justify-start">
                  Resume Upload
                </Button>
                <Button variant="ghost" className="w-full justify-start" onClick={() => navigate("/interview")}>
                  Interview
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
            Resume Analysis
          </h1>
          <p className="text-slate-600 text-lg mb-10">Upload your resume to get AI-powered feedback and scoring</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-2xl text-slate-800">Upload Resume</CardTitle>
                <CardDescription className="text-base">Supported formats: PDF, DOC, DOCX</CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  className="border-3 border-dashed border-blue-300 rounded-2xl p-12 text-center hover:border-blue-500 hover:bg-blue-50/50 transition-all cursor-pointer bg-gradient-to-br from-slate-50 to-blue-50"
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  onClick={() => document.getElementById("file-input")?.click()}
                >
                  <div className="bg-gradient-to-br from-blue-500 to-indigo-500 p-4 rounded-2xl w-fit mx-auto mb-6 shadow-lg">
                    <Upload className="size-12 text-white" />
                  </div>
                  <p className="text-xl font-semibold text-slate-800 mb-3">
                    {file ? file.name : "Drag & drop your resume here"}
                  </p>
                  <p className="text-slate-600 mb-6">or click to browse</p>
                  <input
                    id="file-input"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <Button variant="outline" className="border-2 hover:bg-blue-50">
                    Choose File
                  </Button>
                </div>

                {file && (
                  <div className="mt-8 space-y-5">
                    <div className="flex items-center gap-4 p-5 border-0 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 shadow-md">
                      <div className="bg-gradient-to-br from-blue-500 to-indigo-500 p-3 rounded-xl shadow-md">
                        <FileText className="size-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-slate-800">{file.name}</p>
                        <p className="text-sm text-slate-600">
                          {(file.size / 1024).toFixed(2)} KB
                        </p>
                      </div>
                    </div>

                    <Button
                      className="w-full h-14 text-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all"
                      onClick={handleAnalyze}
                      disabled={analyzing}
                    >
                      {analyzing ? "Analyzing..." : "Analyze Resume"}
                    </Button>

                    <AnimatePresence>
                      {analyzing && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                        >
                          <AnalyzingAnimation />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Results Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {analyzed ? (
              <Card className="border-0 shadow-xl bg-white/80 backdrop-blur">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl text-slate-800">Analysis Results</CardTitle>
                    <Button variant="outline" className="border-2 hover:bg-blue-50">
                      <Download className="size-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-8">
                  {/* Overall Score */}
                  <div className="text-center p-8 bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 rounded-2xl shadow-md">
                    <p className="text-slate-700 mb-3 font-medium text-lg">Overall Score</p>
                    <div className={`text-6xl md:text-7xl font-bold ${getScoreColor(analysisResults.overallScore)} mb-6`}>
                      {analysisResults.overallScore}
                    </div>
                    <Progress value={analysisResults.overallScore} className="h-4" />
                  </div>

                  {/* Section Scores */}
                  <div>
                    <h3 className="font-bold text-lg mb-4 text-slate-800">Section Breakdown</h3>
                    <div className="space-y-3">
                      {analysisResults.sections.map((section, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all"
                        >
                          <div className="flex items-center gap-3">
                            {getStatusIcon(section.status)}
                            <span className="font-medium text-slate-700">{section.name}</span>
                          </div>
                          <span className={`font-bold text-lg ${getScoreColor(section.score)}`}>
                            {section.score}%
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="h-full flex items-center justify-center border-0 shadow-xl bg-white/80 backdrop-blur">
                <CardContent className="text-center py-16">
                  <div className="bg-gradient-to-br from-slate-100 to-blue-100 p-6 rounded-3xl w-fit mx-auto mb-6">
                    <Brain className="size-20 text-slate-400" />
                  </div>
                  <p className="text-slate-600 text-lg">
                    Upload and analyze your resume to see results
                  </p>
                </CardContent>
              </Card>
            )}
          </motion.div>
        </div>

        {/* Detailed Feedback */}
        {analyzed && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 grid md:grid-cols-2 gap-6"
          >
            {/* Strengths */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="bg-gradient-to-br from-green-500 to-emerald-500 p-2 rounded-lg">
                    <CheckCircle2 className="size-6 text-white" />
                  </div>
                  Strengths
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {analysisResults.strengths.map((strength, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-3 p-3 rounded-lg hover:bg-green-50 transition-colors"
                    >
                      <div className="bg-green-100 p-1 rounded-full mt-0.5">
                        <CheckCircle2 className="size-4 text-green-600" />
                      </div>
                      <span className="text-slate-700 leading-relaxed">{strength}</span>
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Improvements */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="bg-gradient-to-br from-yellow-500 to-orange-500 p-2 rounded-lg">
                    <Sparkles className="size-6 text-white" />
                  </div>
                  Suggested Improvements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {analysisResults.improvements.map((improvement, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-3 p-3 rounded-lg hover:bg-yellow-50 transition-colors"
                    >
                      <div className="bg-yellow-100 p-1 rounded-full mt-0.5">
                        <Sparkles className="size-4 text-yellow-600" />
                      </div>
                      <span className="text-slate-700 leading-relaxed">{improvement}</span>
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Keywords */}
            <Card className="md:col-span-2 border-0 shadow-lg bg-white/80 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-2xl text-slate-800">ATS Keywords Analysis</CardTitle>
                <CardDescription className="text-base">
                  Important keywords for Applicant Tracking Systems
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  {analysisResults.keywords.map((keyword, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Badge
                        variant={keyword.present ? "default" : "outline"}
                        className={
                          keyword.present
                            ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 px-4 py-2 text-sm font-medium shadow-md"
                            : "border-2 border-slate-300 text-slate-600 hover:bg-slate-100 px-4 py-2 text-sm font-medium"
                        }
                      >
                        {keyword.word}
                        {keyword.present ? (
                          <CheckCircle2 className="size-4 ml-2" />
                        ) : (
                          <XCircle className="size-4 ml-2" />
                        )}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}

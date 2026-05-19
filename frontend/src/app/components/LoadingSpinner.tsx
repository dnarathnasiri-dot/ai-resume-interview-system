import { motion } from "motion/react";
import { Brain } from "lucide-react";

export function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center p-12">
      <motion.div
        animate={{
          rotate: 360,
          scale: [1, 1.2, 1],
        }}
        transition={{
          rotate: { duration: 2, repeat: Infinity, ease: "linear" },
          scale: { duration: 1, repeat: Infinity, ease: "easeInOut" },
        }}
        className="bg-gradient-to-br from-blue-600 to-indigo-600 p-6 rounded-3xl shadow-2xl mb-6"
      >
        <Brain className="size-16 text-white" />
      </motion.div>
      <motion.div
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="text-slate-600 font-medium text-lg"
      >
        Loading...
      </motion.div>
    </div>
  );
}

export function AnalyzingAnimation() {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <motion.div
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
        }}
        className="relative mb-6"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full blur-xl opacity-50" />
        <div className="relative bg-gradient-to-br from-blue-600 to-indigo-600 p-6 rounded-full shadow-2xl">
          <Brain className="size-12 text-white" />
        </div>
      </motion.div>

      <motion.div
        initial={{ width: "0%" }}
        animate={{ width: "100%" }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="h-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mb-4"
        style={{ maxWidth: "200px" }}
      />

      <motion.div
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        className="text-center"
      >
        <p className="text-slate-700 font-semibold text-lg mb-2">Analyzing Your Resume</p>
        <p className="text-slate-600 text-sm">AI is processing your document...</p>
      </motion.div>
    </div>
  );
}

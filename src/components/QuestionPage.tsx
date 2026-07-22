import { type FC, useEffect, useState } from "react";
import { getQuestionById } from "@/data/questions";
import AnswerCard from "@/components/AnswerCard";

interface QuestionPageProps {
  questionId: number;
  onBack: () => void;
}

const QuestionPage: FC<QuestionPageProps> = ({ questionId, onBack }) => {
  const [isExiting, setIsExiting] = useState(false);
  const [isEntering, setIsEntering] = useState(false);

  const question = getQuestionById(questionId);

  useEffect(() => {
    // Trigger entrance animation
    const timer = setTimeout(() => setIsEntering(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const handleBack = () => {
    setIsExiting(true);
    setTimeout(() => {
      onBack();
    }, 500);
  };

  if (!question) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0a0a0f]">
        <div className="text-center text-zinc-400">
          <p className="text-2xl">❌</p>
          <p className="mt-4">السؤال غير موجود</p>
          <button
            onClick={onBack}
            className="mt-6 rounded-xl border border-violet-500/50 bg-violet-600/20 px-6 py-2 text-violet-300 transition-all hover:bg-violet-600/30"
          >
            ← العودة إلى الرئيسية
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#0a0a0f]">
      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-zinc-800/50 bg-[#0a0a0f]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4">
          <button
            onClick={handleBack}
            className={`
              group relative overflow-hidden rounded-xl border border-zinc-700/50 px-4 py-2 text-sm font-medium
              text-zinc-300 transition-all duration-300
              [transform-style:preserve-3d]
              hover:border-violet-500/50 hover:text-violet-200
              hover:[transform:translateZ(4px)]
              active:[transform:translateZ(1px)]
            `}
            style={{ perspective: "800px" }}
          >
            <span className="absolute inset-0 rounded-xl bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <span className="relative z-10">← العودة</span>
          </button>

          <h1 className="text-2xl font-bold tracking-tight text-white">
            السؤال <span className="text-violet-400">#{questionId}</span>
          </h1>
        </div>
      </header>

      {/* Content */}
      <main className="flex flex-1 items-center justify-center px-4 py-12">
        <div
          className={`
            w-full max-w-3xl transition-all duration-500 ease-out
            [transform-style:preserve-3d]
            ${
              isExiting
                ? "opacity-0 [transform:rotateY(-90deg)_scale(0.8)]"
                : isEntering
                  ? "opacity-100 [transform:rotateY(0deg)_scale(1)]"
                  : "opacity-0 [transform:rotateY(45deg)_scale(0.95)]"
            }
          `}
          style={{ perspective: "1200px" }}
        >
          {/* Question Card */}
          <div className="mb-8 rounded-2xl border border-zinc-700/50 bg-gradient-to-br from-zinc-800/80 to-zinc-900/80 p-8 shadow-2xl shadow-black/30">
            <div className="mb-4 flex items-center justify-center gap-3">
              <span className="text-sm font-medium text-zinc-500">السؤال:</span>
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-violet-500/10 text-2xl">
                ❓
              </span>
            </div>
            <div className="flex justify-center">
              <p className="text-center text-4xl leading-relaxed tracking-wider text-zinc-100 md:text-5xl">
                {question.question}
              </p>
            </div>
            <div className="mt-6 flex justify-end">
              <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-500">
                السؤال {question.id} من 100
              </span>
            </div>
          </div>

          {/* Answer Card with 3D Flip */}
          <div className="rounded-2xl border border-zinc-800/50 bg-zinc-900/40 p-6">
            <AnswerCard answer={question.answer} />
          </div>

          {/* Navigation Button */}
          <div className="mt-8 flex justify-center">
            <button
              onClick={handleBack}
              className="
                group relative h-12 w-full max-w-sm overflow-hidden rounded-xl
                border border-zinc-700/50 bg-zinc-800/60
                text-sm font-medium text-zinc-300
                transition-all duration-300
                [transform-style:preserve-3d]
                hover:border-emerald-500/50 hover:bg-emerald-500/10
                hover:text-emerald-300 hover:shadow-lg hover:shadow-emerald-500/10
                hover:[transform:translateZ(6px)]
                active:[transform:translateZ(2px)]
              "
              style={{ perspective: "800px" }}
            >
              <span className="absolute inset-0 rounded-xl bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <span className="relative z-10 flex items-center justify-center gap-2">
                🏠 العودة إلى صفحة الأسئلة
              </span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default QuestionPage;


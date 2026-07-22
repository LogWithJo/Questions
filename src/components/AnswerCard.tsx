import { type FC, useState } from "react";

interface AnswerCardProps {
  answer: string;
}

const AnswerCard: FC<AnswerCardProps> = ({ answer }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    if (!isFlipped) {
      setIsFlipped(true);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <button
        onClick={handleFlip}
        disabled={isFlipped}
        className={`
          group relative h-14 w-full max-w-xs overflow-hidden rounded-xl font-bold
          transition-all duration-300
          transform-3d
          hover:transform-[translateZ(6px)]
          active:transform-[translateZ(2px)]
          ${
            isFlipped
              ? "cursor-default border-emerald-500/30 bg-emerald-500/10 text-emerald-400 opacity-50"
              : "border-violet-500/50 bg-linear-to-r from-violet-600 to-violet-700 text-white shadow-lg shadow-violet-500/25 hover:from-violet-500 hover:to-violet-600 hover:shadow-violet-400/30"
          }
        `}
        style={{ perspective: "800px" }}
      >
        <span className="absolute inset-0 rounded-xl bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <span className="relative z-10">{isFlipped ? "✅ تم الكشف" : "👀 إظهار الإجابة"}</span>
      </button>

      {/* Answer Card - simple reveal with expand animation */}
      <div
        className={`
          w-full max-w-lg rounded-2xl border border-violet-500/30
          bg-gradient-to-br from-zinc-800/90 to-zinc-900/90
          shadow-xl shadow-violet-500/10
          transition-all duration-500 ease-out
          overflow-hidden
          ${isFlipped ? "opacity-100 scale-100" : "opacity-60 scale-95"}
        `}
        onClick={!isFlipped ? handleFlip : undefined}
      >
        <div className="p-6">
          <div className="mb-4 flex items-center justify-center gap-2">
            <span className="text-2xl">💡</span>
            <span className="text-base font-medium text-violet-400">الإجابة:</span>
          </div>
          {isFlipped ? (
            <div className="flex justify-center">
              <p className="text-center text-3xl leading-relaxed tracking-wider text-zinc-100 md:text-4xl animate-[fadeIn_0.5s_ease-out_forwards]">
                {answer}
              </p>
            </div>
          ) : (
            <p className="text-center text-lg font-medium text-zinc-400">
              اضغط على الزر أعلاه لكشف الإجابة
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnswerCard;


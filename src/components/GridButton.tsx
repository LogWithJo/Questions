import { type FC } from "react";

interface GridButtonProps {
  id: number;
  visited: boolean;
  onClick: (id: number) => void;
}

const GridButton: FC<GridButtonProps> = ({ id, visited, onClick }) => {
  return (
    <button
      onClick={() => onClick(id)}
      className={`
        group relative h-16 w-full overflow-hidden rounded-xl border text-lg font-bold
        transition-all duration-300 ease-out
        [transform-style:preserve-3d]
        hover:[transform:translateZ(8px)_rotateX(-5deg)_rotateY(3deg)]
        active:[transform:translateZ(2px)_rotateX(0deg)_rotateY(0deg)]
        ${
          visited
            ? "border-emerald-500/50 bg-emerald-500/20 text-emerald-300 shadow-lg shadow-emerald-500/20"
            : "border-zinc-700/50 bg-zinc-800/60 text-zinc-300 shadow-lg shadow-black/20 hover:border-violet-500/50 hover:bg-zinc-700/80 hover:text-violet-200 hover:shadow-violet-500/10"
        }
      `}
      style={{ perspective: "800px" }}
    >
      {/* Inner 3D depth layer */}
      <span
        className={`
          absolute inset-0 rounded-xl opacity-30 transition-all duration-300
          ${visited ? "bg-gradient-to-br from-emerald-400/20 to-emerald-600/10" : "bg-gradient-to-br from-white/5 to-white/0 group-hover:from-violet-400/10 group-hover:to-violet-600/5"}
        `}
      />

      {/* Shine effect */}
      <span className="absolute inset-0 rounded-xl bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Number */}
      <span className="relative z-10">{id}</span>

      {/* 3D bottom edge */}
      <span
        className={`
          absolute -bottom-1 left-0 right-0 h-1 rounded-b-xl
          transition-all duration-300
          ${visited ? "bg-emerald-600/40" : "bg-zinc-700/40 group-hover:bg-violet-600/40"}
        `}
      />
    </button>
  );
};

export default GridButton;


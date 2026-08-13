import { type FC, useCallback, useRef } from "react";
import GridButton from "@/components/GridButton";
import { questions } from "@/data/questions";
import { useLocalStorage } from "@/hooks/useLocalStorage";

interface GridPageProps {
	onNavigate: (id: number) => void;
}

const GridPage: FC<GridPageProps> = ({ onNavigate }) => {
	const [visited, setVisited] = useLocalStorage<number[]>(
		"visited-questions",
		[],
	);
	const gridRef = useRef<HTMLDivElement>(null);

	const handleClick = useCallback(
		(id: number) => {
			setVisited((prev) => {
				if (!prev.includes(id)) {
					return [...prev, id];
				}
				return prev;
			});
			onNavigate(id);
		},
		[setVisited, onNavigate],
	);

	return (
		<div className="flex min-h-screen flex-col bg-[#0a0a0f]">
			{/* Header */}
			<header className="sticky top-0 z-20 border-b border-zinc-800/50 bg-[#0a0a0f]/80 backdrop-blur-xl">
				<div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
					<div className="flex items-center gap-3">
						<h1 className="text-2xl font-bold tracking-tight text-white">
							<span className="text-violet-400">❓</span> الأسئلة
						</h1>
					</div>
					<div className="flex items-center gap-2 text-sm text-zinc-400">
						<span className="rounded-full bg-emerald-500/10 px-3 py-1 text-emerald-400">
							{visited.length}/100
						</span>
					</div>
				</div>
				{/* Progress bar */}
				<div className="h-[2px] bg-zinc-800">
					<div
						className="h-full bg-gradient-to-r from-violet-500 to-emerald-500 transition-all duration-700 ease-out"
						style={{ width: `${(visited.length / 100) * 100}%` }}
					/>
				</div>
			</header>

			{/* Grid */}
			<main className="flex-1 px-4 py-8">
				<div className="mx-auto max-w-5xl">
					<div
						ref={gridRef}
						className="grid grid-cols-5 gap-3 sm:grid-cols-8 md:grid-cols-10"
						style={{ perspective: "1200px" }}
					>
						{questions.map((q) => (
							<div
								key={q.id}
								className="[transform-style:preserve-3d] animate-[fadeIn_0.5s_ease-out_forwards] opacity-0"
								style={{ animationDelay: `${q.id * 15}ms` }}
							>
								<GridButton
									id={q.id}
									visited={visited.includes(q.id)}
									onClick={handleClick}
								/>
							</div>
						))}
					</div>
				</div>
			</main>

			{/* Footer */}
			<footer className="border-t border-zinc-800/50 px-4 py-4 text-center text-xs text-zinc-600">
				جميع الحقوق محفوظة © {new Date().getFullYear()}
			</footer>
		</div>
	);
};

export default GridPage;

import { useState, useCallback } from "react";
import GridPage from "@/components/GridPage";
import QuestionPage from "@/components/QuestionPage";

type Page = "grid" | "question";

function App() {
  const [currentPage, setCurrentPage] = useState<Page>("grid");
  const [selectedQuestionId, setSelectedQuestionId] = useState<number | null>(null);

  const handleNavigateToQuestion = useCallback((id: number) => {
    setSelectedQuestionId(id);
    setCurrentPage("question");
  }, []);

  const handleNavigateToGrid = useCallback(() => {
    setCurrentPage("grid");
    setSelectedQuestionId(null);
  }, []);

  return (
    <div className="font-sans" style={{ fontFamily: "'Noto Sans Arabic', sans-serif" }}>
      {currentPage === "grid" ? (
        <GridPage onNavigate={handleNavigateToQuestion} />
      ) : (
        selectedQuestionId !== null && (
          <QuestionPage
            questionId={selectedQuestionId}
            onBack={handleNavigateToGrid}
          />
        )
      )}
    </div>
  );
}

export default App;


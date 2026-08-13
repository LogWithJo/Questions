import type { Question } from "@/types";
import data from "../../data1.json" with { type: "json" };

export const questions: Question[] = data as Question[];

export function getQuestionById(id: number): Question | undefined {
	return questions.find((q) => q.id === id);
}

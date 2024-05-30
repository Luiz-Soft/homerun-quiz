export type Difficulty = 'easy' | 'medium' | 'hard';

export interface Question {
  category: string;
  type: string;
  difficulty: Difficulty;
  question: string;
  correctAnswer: string;
  answers: string[];
}

export interface QuizState {
  questions: Question[];
  currentQuestionIndex: number;
  score: number;
  timeLimit: number;
  quizDifficulty: Difficulty;
  error: string | null;
}

export function serializeQuestions(rawQuestions: any[]): Question[] {
  return rawQuestions.map(({ category, type, difficulty, question, correct_answer, incorrect_answers }) => ({
    category,
    type,
    difficulty,
    question,
    correctAnswer: correct_answer,
    answers: [...incorrect_answers, correct_answer]
  }));
}

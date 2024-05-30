import axios from 'axios';
import he from 'he';

const API_URL = import.meta.env.VITE_QUIZ_API_URL;

if (!API_URL) {
  throw new Error('Missing QUIZ_API_URL environment variable');
}

export const fetchQuestions = async (amount = 10, difficulty = 'easy') => {
  try {
    const response = await axios.get(API_URL, {
      params: {
        amount,
        difficulty,
      },
    });
    return response.data.results.map((question: any) => ({
      ...question,
      question: he.decode(question.question),
      correct_answer: he.decode(question.correct_answer),
      incorrect_answers: question.incorrect_answers.map((answer: string) => he.decode(answer))
    }));
  } catch (error) {
    console.error('Error fetching questions:', error);
    throw error;
  }
};
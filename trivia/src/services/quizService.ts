import axios from 'axios';

const API_URL = import.meta.env.VITE_QUIZ_API_URL;

if (!API_URL) {
  throw new Error('Missing QUIZ_API_URL environment variable');
}

export const fetchQuestions = async (amount = 10, difficulty = 'easy') => {
  try {
    const response = await axios.get(API_URL, {
      params: {
        amount,
        difficulty
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error fetching questions:', error);
    throw error;
  }
};
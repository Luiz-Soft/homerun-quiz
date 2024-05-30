import { defineStore } from 'pinia'
import { ref, Ref } from 'vue'
import { fetchQuestions } from '@/services/quizService'
import { Question, Difficulty, serializeQuestions } from '@/types/quiz' // Adjust the path as needed
import { useTimer } from '@/composables/useTimer' // Adjust the path as needed

export const useQuizStore = defineStore('quiz', () => {
  const questions: Ref<Question[]> = ref([])
  const currentQuestionIndex: Ref<number> = ref(0)
  const score: Ref<number> = ref(0)
  const isGameFinished: Ref<boolean> = ref(false)
  const questionAmount: Ref<number> = ref(10) // Default to 10 questions
  const timeLimit: Ref<number> = ref(10)
  const quizDifficulty: Ref<Difficulty> = ref('easy')
  const { timeLeft, startTimer, stopTimer, resetTimer } = useTimer(timeLimit.value)

  const loadQuestions = async (
    amount: number = questionAmount.value,
    difficulty: Difficulty = quizDifficulty.value
  ) => {
    try {
      const result = await fetchQuestions(amount, difficulty)
      questions.value = serializeQuestions(result)
      quizDifficulty.value = difficulty
    } catch (err) {
      console.log(err)
    }
  }

  const nextQuestion = () => {
    if (currentQuestionIndex.value < questions.value.length - 1) {
      currentQuestionIndex.value++
      resetTimer(timeLimit.value)
    } else isGameFinished.value = true
  }

  const contabilizeUserScore = (isCorrect: boolean) => {
    if (isCorrect) {
      const timeUsed = timeLimit.value - timeLeft.value
      score.value += 10 + (timeLimit.value - timeUsed)
    }
  }

  return {
    contabilizeUserScore,
    questions,
    questionAmount,
    currentQuestionIndex,
    isGameFinished,
    score,
    timeLimit,
    quizDifficulty,
    timeLeft,
    loadQuestions,
    nextQuestion,
    startTimer,
    stopTimer,
    resetTimer
  }
})

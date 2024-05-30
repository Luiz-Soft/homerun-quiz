<template>
    <div class="quiz-container">
      <h1>HOMERUN TRIVIA</h1>
      <StatusBar />
      <Question
        v-if="currentQuestion && !isGameFinished"
        :question="currentQuestion"
        :timeLeft="timeLeft"
        @confirmedAnswer="confirmAnswer"
        @nextQuestion="nextQuestion"
      />
      <button v-if="isGameFinished" @click="resetQuiz">Restart Game</button>
    </div>
  </template>

<script lang="ts">
import { defineComponent, computed, onMounted, watch } from 'vue'
import { useQuizStore } from '@/stores/quizStore'
import Question from '@/components/Question.vue'
import StatusBar from '@/components/StatusBar.vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'QuizView',
  components: {
    Question,
    StatusBar
  },
  setup() {
    const router = useRouter()
    const quizStore = useQuizStore()
    const timeLeft = computed(() => quizStore.timeLeft)
    const isGameFinished = computed(() => quizStore.isGameFinished)

    quizStore.loadQuestions()

    const currentQuestion = computed(() => {
      return quizStore.questions[quizStore.currentQuestionIndex]
    })

    const confirmAnswer = (userAnswer: boolean) => {
      console.log(userAnswer)
      quizStore.stopTimer()
      quizStore.contabilizeUserScore(userAnswer)
    }
    const isLastQuestionAnswered = computed(() => {
      return quizStore.currentQuestionIndex + 1 === quizStore.questionAmount
    })
    const nextQuestion = () => {
      quizStore.nextQuestion()
    }
    onMounted(() => {
      quizStore.resetTimer(quizStore.timeLimit)
    })
    const resetQuiz = () => {
      quizStore.currentQuestionIndex = 0
      quizStore.score = 0
      quizStore.isGameFinished = false
      quizStore.resetTimer(quizStore.timeLimit.value)
      router.push({ name: 'start' })
    }
    watch(isGameFinished, (newValue) => {
      if (newValue) {
        alert(`Game Finished! Your 💰Score is: ${quizStore.score}`)
      }
    })
    return {
      currentQuestion,
      confirmAnswer,
      nextQuestion,
      timeLeft,
      isGameFinished,
      isLastQuestionAnswered,
      resetQuiz
    }
  }
})
</script>

<style scoped>
    .quiz-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 2em;
      background: linear-gradient(135deg, #f5f7fa, #c3cfe2);
      border-radius: 10px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      max-width: 600px;
      margin: 0 auto;
    }
    
    h1 {
      font-family: 'Arial', sans-serif;
      color: #333;
      margin-bottom: 1em;
      font-size: 2em;
    }
    
    button {
      padding: 0.7em;
      border: none;
      border-radius: 5px;
      background-color: #007bff;
      color: white;
      font-size: 1.1em;
      cursor: pointer;
      transition: background-color 0.3s ease;
      width: 100%;
      margin-top: 1em;
    }
    
    button:hover {
      background-color: #0056b3;
    }
    
    @media (max-width: 480px) {
      .quiz-container {
        padding: 1em;
      }
    
      h1 {
        font-size: 1.5em;
      }
    
      button {
        font-size: 0.9em;
        padding: 0.5em;
      }
    }
    </style>

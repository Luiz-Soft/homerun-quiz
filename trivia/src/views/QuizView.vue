<template>
  <div>
    <p>QUESTION VIEW</p>
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

<template>
  <div class="start-container">
    <h1>Quiz Start</h1>
    <form @submit.prevent="startQuiz">
      <label for="difficulty">🧠Select Difficulty:</label>
      <select id="difficulty" v-model="selectedDifficulty">
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>

      <label for="timeLimit">⏱Time Limit (seconds):</label>
      <input id="timeLimit" type="number" v-model.number="timeLimit" :min="10" :max="120" />

      <label for="questionAmount">📝Number of Questions:</label>
      <input id="questionAmount" type="number" v-model.number="questionAmount" :min="1" :max="50" />

      <button type="submit">Start Quiz</button>
    </form>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuizStore } from '@/stores/quizStore'
import { Difficulty } from '@/types/quiz'

export default {
  name: 'StartComponent',
  setup() {
    const router = useRouter()
    const quizStore = useQuizStore()

    const selectedDifficulty = ref<Difficulty>('easy')
    const timeLimit = ref(30)
    const questionAmount = ref(10)

    const startQuiz = () => {
      quizStore.$patch({
        quizDifficulty: selectedDifficulty.value,
        timeLimit: timeLimit.value,
        questionAmount: questionAmount.value
      })
      router.push({ name: 'quiz' })
    }

    return {
      selectedDifficulty,
      timeLimit,
      questionAmount,
      startQuiz
    }
  }
}
</script>

<style scoped>
.start-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1em;
}

button {
  margin-top: 1em;
}
</style>

<template>
  <div class="start-container">
    <h1>Quiz Start</h1>
    <form @submit.prevent="startQuiz">
      <label for="difficulty">🧠 Select Difficulty:</label>
      <select id="difficulty" v-model="selectedDifficulty">
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>

      <label for="timeLimit">⏱ Time Limit (seconds):</label>
      <input id="timeLimit" type="number" v-model.number="timeLimit" :min="10" :max="120" />

      <label for="questionAmount">📝 Number of Questions:</label>
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
  padding: 2em;
  background: linear-gradient(135deg, #f5f7fa, #c3cfe2);
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  margin: 0 auto;
}

h1 {
  font-family: 'Arial', sans-serif;
  color: #333;
  margin-bottom: 1em;
  font-size: 2em;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1em;
  width: 100%;
}

label {
  font-family: 'Arial', sans-serif;
  color: #333;
  font-size: 1.1em;
  margin-bottom: 0.5em;
}

select,
input {
  padding: 0.5em;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 1em;
  width: 100%;
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
  .start-container {
    padding: 1em;
  }

  h1 {
    font-size: 1.5em;
  }

  label {
    font-size: 1em;
  }

  select,
  input,
  button {
    font-size: 0.9em;
    padding: 0.5em;
  }
}
</style>

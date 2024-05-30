<template>
  <div class="status-bar">
    <p>⏱Time left: {{ timeLeft }} seconds</p>
    <p>🧠Difficulty: {{ quizDifficulty }}</p>
    <p>📝Question: {{ currentQuestionIndex + 1 }}/{{ questionAmount }}</p>
    <p>💰Score: {{ score }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useQuizStore } from '@/stores/quizStore'

const quizStore = useQuizStore()

const questionAmount = computed(() => quizStore.questionAmount)
const quizDifficulty = computed(() => quizStore.quizDifficulty)
const currentQuestionIndex = computed(() => quizStore.currentQuestionIndex)
const timeLeft = computed(() => quizStore.timeLeft)
const score = computed(() => quizStore.score)
</script>

<style scoped>
.status-bar {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 1em;
  background-color: #282c34;
  color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 1em;
  width: 100%;
  max-width: 600px;
  margin: 0 auto 1em auto;
}

.status-bar p {
  margin: 0.5em 0;
  font-family: 'Arial', sans-serif;
  font-size: 1.1em;
}

@media (max-width: 480px) {
  .status-bar {
    padding: 0.5em;
  }

  .status-bar p {
    font-size: 0.9em;
    margin: 0.3em 0;
  }
}
</style>

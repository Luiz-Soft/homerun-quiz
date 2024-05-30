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
  justify-content: space-between;
  padding: 10px;
  background-color: #f0f0f0;
  border-bottom: 1px solid #ddd;
}

.status-bar p {
  margin: 0;
}
</style>

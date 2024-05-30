<template>
  <div class="question-container">
    <h2>{{ question.question }}</h2>
    <ul>
      <li v-for="(answer, index) in shuffledAnswers" :key="index" :class="getAnswerClass(answer)">
        <label>
          <input
            type="radio"
            :name="question.question"
            :value="answer"
            v-model="selectedAnswer"
            :disabled="isDisabled"
          />
          {{ answer }}
        </label>
      </li>
    </ul>
    <button @click="confirmAnswer" :disabled="!selectedAnswer || confirmedAnswer">Confirm</button>
    <button @click="nextQuestion" v-if="!!confirmedAnswer || timeLeft === 0">Next</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch, PropType } from 'vue'
import { Question } from '@/types/quiz'

export default defineComponent({
  name: 'Question',
  props: {
    question: {
      type: Object as PropType<Question>,
      required: true
    },
    timeLeft: {
      type: Number,
      required: false
    }
  },
  setup(props, { emit }) {
    // Using useQuizStore and useTimer composables

    // Reactive references
    const selectedAnswer = ref<string | null>(null)
    const confirmedAnswer = ref<string | null>(null)
    const correctAnswer = computed(() => props.question.correctAnswer)

    // Computed property to shuffle answers
    const shuffledAnswers = computed(() => {
      return [...props.question.answers].sort(() => Math.random() - 0.5)
    })

    // Function to confirm the selected answer
    const confirmAnswer = () => {
      confirmedAnswer.value = selectedAnswer.value
      emit('confirmedAnswer', confirmedAnswer.value === correctAnswer.value) // Emit the confirmAnswer event
    }

    // Watch for time left to call onTimeUp
    watch(
      () => props.timeLeft,
      (newTimeLeft) => {
        if (newTimeLeft === 0) {
          selectedAnswer.value = null
          confirmedAnswer.value = undefined
        }
      }
    )

    // Clear interval on unmounted
    const nextQuestion = () => {
      selectedAnswer.value = null
      confirmedAnswer.value = null
      emit('nextQuestion') // Emit the nextQuestion event
    }

    const isDisabled = computed(() => {
      return props.timeLeft === 0 || confirmedAnswer.value !== null
    })
    // Method to get the class for the answer label
    const getAnswerClass = (answer: string) => {
      if (confirmedAnswer.value === answer) {
        return answer === correctAnswer.value ? 'correct' : 'incorrect'
      } else if (confirmedAnswer.value === null) return 'blank'

      return answer === correctAnswer.value ? 'correct' : 'blank'
    }

    return {
      confirmedAnswer,
      correctAnswer,
      selectedAnswer,
      shuffledAnswers,
      confirmAnswer,
      getAnswerClass,
      isDisabled,
      nextQuestion
    }
  }
})
</script>

<style scoped>
.question-container {
  /* Add your styles here */
}
.question-container {
  /* Add your styles here */
}

.blank {
  background-color: blue;
  color: white;
}

.correct {
  background-color: green;
  color: white;
}

.incorrect {
  background-color: red;
  color: white;
}
</style>

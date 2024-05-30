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
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2em;
  background: linear-gradient(135deg, #e2e2e2, #c3cfe2);
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 0 auto 1em auto;
}

h2 {
  font-family: 'Arial', sans-serif;
  color: #333;
  margin-bottom: 1em;
  font-size: 1.5em;
  text-align: center;
}

ul {
  list-style: none;
  padding: 0;
  width: 100%;
}

li {
  margin-bottom: 1em;
}

label {
  display: flex;
  align-items: center;
  font-family: 'Arial', sans-serif;
  color: #333;
  font-size: 1.1em;
}

input[type='radio'] {
  margin-right: 0.5em;
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

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

button:hover:enabled {
  background-color: #0056b3;
}

.blank {
  color: #333;
}

.correct {
  background-color: green;
  color: white;
}

.incorrect {
  background-color: red;
  color: white;
}

@media (max-width: 480px) {
  .question-container {
    padding: 1em;
  }

  h2 {
    font-size: 1.2em;
  }

  label {
    font-size: 1em;
  }

  button {
    font-size: 0.9em;
    padding: 0.5em;
  }
}
</style>

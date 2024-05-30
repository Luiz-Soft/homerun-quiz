import { ref, onUnmounted } from 'vue'

export function useTimer(initialTime: number) {
  const timeLeft = ref(initialTime)
  let timer: ReturnType<typeof setInterval>

  const startTimer = () => {
    if (timer) clearInterval(timer)
    timer = setInterval(() => {
      if (timeLeft.value > 0) {
        timeLeft.value--
      } else {
        clearInterval(timer)
      }
    }, 1000)
  }

  const resetTimer = (newTime: number) => {
    clearInterval(timer)
    timeLeft.value = newTime
    startTimer()
  }
  const stopTimer = () => {
    clearInterval(timer)
  }
  onUnmounted(() => {
    stopTimer()
  })

  return {
    timeLeft,
    startTimer,
    stopTimer,
    resetTimer
  }
}

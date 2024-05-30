import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import { describe, it, beforeEach, expect, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useQuizStore } from '@/stores/quizStore'
import QuizView from '@/views/QuizView.vue'
import Question from '@/components/Question.vue'
import StatusBar from '@/components/StatusBar.vue'

const routes = [
  { path: '/', name: 'start', component: { template: '<div>Start Component</div>' } },
  { path: '/quiz', name: 'quiz', component: QuizView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

describe('QuizView.vue', () => {
  let wrapper: any
  let quizStore: ReturnType<typeof useQuizStore>

  beforeEach(async () => {
    setActivePinia(createPinia())
    quizStore = useQuizStore()
    wrapper = mount(QuizView, {
      global: {
        plugins: [router],
        components: {
          Question,
          StatusBar,
        },
      },
    })
    router.push('/quiz')
    await router.isReady()
  })

  it('renders correctly', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('loads questions on mount', () => {
    
  })

  it('shows the current question and status bar', () => {

  })

  it('calls confirmAnswer and updates store on answer confirmation', async () => {

  })

  it('moves to the next question when nextQuestion is called', async () => {
    quizStore.questions = [
      { question: 'What is 2+2?', correctAnswer: '4', incorrectAnswers: ['3', '5', '6'] },
      { question: 'What is 3+3?', correctAnswer: '6', incorrectAnswers: ['5', '7', '8'] },
    ]
    quizStore.currentQuestionIndex = 0

    await wrapper.vm.nextQuestion()
    expect(quizStore.currentQuestionIndex).toBe(1)
  })

  it('resets the quiz correctly', async () => {
   
  })

  it('shows an alert with the score when the game is finished', async () => {
    const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {})

    quizStore.isGameFinished = true
    await wrapper.vm.$nextTick()

    expect(alertMock).toHaveBeenCalledWith(`Game Finished! Your 💰Score is: ${quizStore.score}`)
    alertMock.mockRestore()
  })
})

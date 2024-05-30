import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import QuizStartView from '@/views/QuizStartView.vue'
import { createPinia, setActivePinia } from 'pinia'
import { useQuizStore } from '@/stores/quizStore'
import { describe, it, beforeEach, expect } from 'vitest'
import { nextTick } from 'vue'

const routes = [
  { path: '/', name: 'start', component: QuizStartView },
  { path: '/quiz', name: 'quiz', component: { template: '<div>Quiz Component</div>' } },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

describe('QuizStartView', () => {
  let wrapper: any
  let quizStore: ReturnType<typeof useQuizStore>

  beforeEach(() => {
    setActivePinia(createPinia())
    quizStore = useQuizStore()
    wrapper = mount(QuizStartView, {
      global: {
        plugins: [router],
      },
    })
  })

  it('renders correctly', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('has default values', () => {
    expect(wrapper.find('#difficulty').element.value).toBe('easy')
    expect(wrapper.find('#timeLimit').element.value).toBe('30')
    expect(wrapper.find('#questionAmount').element.value).toBe('10')
  })


  it('updates the store and calls router push on form submission', async () => {
    const push = vi.spyOn(router, 'push')
    
    const difficulty = wrapper.find('#difficulty')
    const timeLimit = wrapper.find('#timeLimit')
    const questionAmount = wrapper.find('#questionAmount')

    await difficulty.setValue('medium')
    await timeLimit.setValue('45')
    await questionAmount.setValue('20')

    await wrapper.find('form').trigger('submit.prevent')

    await nextTick()

    expect(quizStore.quizDifficulty).toBe('medium')
    expect(quizStore.timeLimit).toBe(45)
    expect(quizStore.questionAmount).toBe(20)

    expect(push).toHaveBeenCalledWith({ name: 'quiz' })
  })

  it('sets the quiz store values correctly', async () => {
    await wrapper.find('#difficulty').setValue('hard')
    await wrapper.find('#timeLimit').setValue('60')
    await wrapper.find('#questionAmount').setValue('15')

    await wrapper.find('form').trigger('submit.prevent')

    expect(quizStore.quizDifficulty).toBe('hard')
    expect(quizStore.timeLimit).toBe(60)
    expect(quizStore.questionAmount).toBe(15)
  })
})
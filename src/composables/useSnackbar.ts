import { reactive } from 'vue'

const state = reactive({
  show: false,
  message: '',
  color: 'error',
})

export function useSnackbar() {
  function showError(msg: string) {
    state.message = msg
    state.color = 'error'
    state.show = true
  }
  return { state, showError }
}

import { GetterTree } from 'vuex'

const getters: GetterTree<CounterState, RootState> = {
  counter(state): number {
    return state.counter
  }
}

export default getters

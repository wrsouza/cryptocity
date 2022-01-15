import { MutationTree } from 'vuex'

const mutations: MutationTree<CounterState> = {
  SET_COUNTER(state, value: number): void {
    state.counter = value
  }
}

export default mutations

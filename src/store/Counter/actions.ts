import { ActionTree } from 'vuex'

const actions: ActionTree<CounterState, RootState> = {
  setCounter({ commit }, value: number): void {
    commit('SET_COUNTER', value)
  }
}

export default actions

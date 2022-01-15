import { Module } from 'vuex'
import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'

const Counter: Module<CounterState, RootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}

export default Counter

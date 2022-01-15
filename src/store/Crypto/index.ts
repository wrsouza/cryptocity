import { Module } from 'vuex'
import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'

const Crypto: Module<CryptoState, RootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}

export default Crypto

import { createStore, StoreOptions } from 'vuex'
import Counter from './Counter'
import Crypto from './Crypto'

const store: StoreOptions<RootState> = {
  state: {},
  modules: {
    Counter,
    Crypto
  }
}

export default createStore(store)

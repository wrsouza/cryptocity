import { MutationTree } from 'vuex'
import { statusCalculate } from '~/utils'

const mutations: MutationTree<CryptoState> = {
  SET_COIN(state, payload: CryptoCoin): void {
    const { status, percent } = statusCalculate({
      price: payload.currentPrice[state.coinType],
      high: payload.high24h[state.coinType],
      low: payload.low24h[state.coinType]
    })
    if (state.coins.find(item => item.id === payload.id)) {
      state.coins = state.coins.map(item =>
        item.id === payload.id
          ? {
              ...payload,
              quantity: item.quantity,
              discount: item.discount,
              limitBuy: item.limitBuy,
              limitSell: item.limitSell,
              monitor: item.monitor,
              status
            }
          : item
      )
    } else {
      state.coins.push({
        ...payload,
        monitor: false,
        status
      })
    }
  },

  SET_QUANTITY(state, { id, quantity }: SetQuantityPayload): void {
    state.coins = state.coins.map(item =>
      item.id === id ? { ...item, quantity } : item
    )
  },

  SET_LIMIT(state, { id, limitBuy, limitSell }: SetLimitPayload): void {
    state.coins = state.coins.map(item =>
      item.id === id ? { ...item, limitBuy, limitSell } : item
    )
  },

  SET_SWAP(state, { id, quantity, discount }: SetSwapPayload): void {
    state.coins = state.coins.map(item =>
      item.id === id ? { ...item, quantity, discount } : item
    )
  }
}

export default mutations

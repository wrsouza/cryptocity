import { MutationTree } from 'vuex'
import { dataWrite, statusCalculate } from '~/utils'

const mutations: MutationTree<CryptoState> = {
  UPDATE_COINS(state, payload: CryptoCoin[]): void {
    state.coins = payload
  },

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
              notifyTimesBuy: item.notifyTimesBuy,
              limitSell: item.limitSell,
              notifyTimesSell: item.notifyTimesSell,
              monitor: item.monitor,
              status
            }
          : item
      )
    } else {
      state.coins.push({
        ...payload,
        notifyTimesBuy: 0,
        notifyTimesSell: 0,
        monitor: false,
        status
      })
    }
    dataWrite(state.coins, 'cryptos')
  },

  SET_MONITOR(
    state,
    { id, limitBuy, limitSell, monitor }: SetMonitorPayload
  ): void {
    state.coins = state.coins.map(item =>
      item.id === id ? { ...item, limitBuy, limitSell, monitor } : item
    )
    dataWrite(state.coins, 'cryptos')
  },

  SET_SWAP(state, { id, quantity, discount }: SetSwapPayload): void {
    state.coins = state.coins.map(item =>
      item.id === id
        ? { ...item, quantity, discount, notifyTimesSell: 0, notifyTimesBuy: 0 }
        : item
    )
    dataWrite(state.coins, 'cryptos')
  },

  REMOVE_COIN(state, id: string): void {
    state.coins = state.coins.filter(item => item.id !== id)
    dataWrite(state.coins, 'cryptos')
  },

  SET_NOTIFY_TIMES(state, { id, notifyTimesBuy, notifyTimesSell }): void {
    state.coins = state.coins.map(item =>
      item.id === id ? { ...item, notifyTimesSell, notifyTimesBuy } : item
    )
    dataWrite(state.coins, 'cryptos')
  }
}

export default mutations

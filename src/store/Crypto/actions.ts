import { AxiosError } from 'axios'
import Swal from 'sweetalert2'
import { ActionTree } from 'vuex'
import http from '~/services/http'

const actions: ActionTree<CryptoState, RootState> = {
  async setCoin({ state, commit, dispatch }, id: string): Promise<void> {
    try {
      const history = await dispatch('setHistory', id)
      const response = await http.get(id)
      const { data } = response
      commit('SET_COIN', {
        id: data.id,
        name: data.name,
        symbol: data.symbol,
        image: data.image.large,
        currentPrice: {
          bnb: data.market_data.current_price.bnb,
          brl: data.market_data.current_price.brl,
          usd: data.market_data.current_price.usd
        },
        high24h: {
          bnb: data.market_data.high_24h.bnb,
          brl: data.market_data.high_24h.brl,
          usd: data.market_data.high_24h.usd
        },
        low24h: {
          bnb: data.market_data.low_24h.bnb,
          brl: data.market_data.low_24h.brl,
          usd: data.market_data.low_24h.usd
        },
        history
      })
      setTimeout(() => dispatch('sendNotification', id), 1000)
    } catch (err: any) {
      if (err.response.status === 404) {
        Swal.fire(`${id}`, `Not Found!`, 'error')
      }
    }
  },

  async setHistory({ commit, state }, id: string): Promise<number[] | Error> {
    try {
      const response = await http.get(
        `${id}/market_chart?vs_currency=${state.coinType}&days=1`
      )
      const { data } = response
      return data.prices.map(item => item[1])
      //commit('SET_HISTORY', { id, history })
    } catch (err) {
      throw err
    }
  },

  setSwap({ commit }, payload: SetSwapPayload): void {
    commit('SET_SWAP', payload)
  },

  setStatus({ commit }, payload: SetStatusPayload): void {
    commit('SET_STATUS', payload)
  },

  setMonitor({ commit }, payload: SetMonitorPayload): void {
    commit('SET_MONITOR', payload)
  },

  removeCoin({ commit }, id: string): void {
    commit('REMOVE_COIN', id)
  },

  updateCoins({ commit }, payload: CryptoCoin[]) {
    commit('UPDATE_COINS', payload)
  },

  sendNotification({ state, commit }, id: string): void {
    const coinType = state.coinType
    const coin = state.coins.find(item => item.id === id)
    let title: string, icon: string, body: string
    const audio = new Audio('/siren.wav')
    if (
      coin &&
      coin.monitor &&
      coin.limitBuy &&
      coin.currentPrice[coinType] <= coin.limitBuy &&
      coin.notifyTimesBuy < 5
    ) {
      title = `Hey, Buy ${coin.name}`
      icon = coin.image
      body = `${coin.name} price is ${coin.currentPrice[coinType]}`
      audio.play()
      Notification.requestPermission().then(result => {
        if (result === 'granted') {
          new Notification(title, {
            body,
            icon
          })
          commit('SET_NOTIFY_TIMES', {
            id,
            notifyTimesBuy: coin.notifyTimesBuy + 1,
            notifyTimesSell: coin.notifyTimesSell
          })
        }
      })
    }
    if (
      coin &&
      coin.monitor &&
      coin.limitSell &&
      coin.currentPrice[coinType] >= coin.limitSell &&
      coin.notifyTimesSell < 5
    ) {
      title = `Hey, Sell ${coin.name}`
      icon = coin.image
      body = `${coin.name} price is ${coin.currentPrice[coinType]}`
      audio.play()
      Notification.requestPermission().then(result => {
        if (result === 'granted') {
          new Notification(title, {
            body,
            icon
          })
          commit('SET_NOTIFY_TIMES', {
            id,
            notifyTimesBuy: coin.notifyTimesBuy,
            notifyTimesSell: coin.notifyTimesSell + 1
          })
        }
      })
    }
  }
}

export default actions

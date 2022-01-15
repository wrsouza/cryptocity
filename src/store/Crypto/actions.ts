import { ActionTree } from 'vuex'
import http from '~/services/http'

const actions: ActionTree<CryptoState, RootState> = {
  async setCoin({ commit }, url: string): Promise<void> {
    try {
      const response = await http.get(url)
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
        }
      })
    } catch (err) {
      console.log(err)
    }
  },

  setQuantity({ commit }, payload: SetQuantityPayload): void {
    commit('SET_QUANTITY', payload)
  },

  setStatus({ commit }, payload: SetStatusPayload): void {
    commit('SET_STATUS', payload)
  }
}

export default actions

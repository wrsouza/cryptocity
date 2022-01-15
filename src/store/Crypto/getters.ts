import { GetterTree } from 'vuex'

const getters: GetterTree<CryptoState, RootState> = {
  coins(state): CryptoCoinResume[] {
    return state.coins.map(item => ({
      id: item.id,
      name: item.name,
      symbol: item.symbol,
      image: item.image,
      price: item.currentPrice[state.coinType],
      high24h: item.high24h[state.coinType],
      low24h: item.low24h[state.coinType],
      quantity: item.quantity,
      status: item.status,
      percent: item.percent
    }))
  }
}

export default getters

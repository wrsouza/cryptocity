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
      status: item.status
    }))
  },
  getCoin:
    state =>
    (id: string): CryptoCoin | undefined => {
      return state.coins.find(item => item.id === id)
    },
  getIds(state): string[] {
    let names: string[] = []
    for (let item of state.coins) {
      names.push(item.id)
    }
    return names
  },
  getFilteredCoins:
    state =>
    (id: string): CryptoCoin[] => {
      return state.coins.filter(item => item.id !== id)
    }
}

export default getters

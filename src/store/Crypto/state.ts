const state: CryptoState = {
  coinType: 'brl',
  coins: [
    {
      id: 'cryptocars',
      name: 'CryptoCars',
      symbol: 'ccar',
      image:
        'https://assets.coingecko.com/coins/images/17896/large/CCAR.jpg?1630560445',
      status: 'HOLD',
      monitor: false,
      limitBuy: undefined,
      limitSell: undefined,
      quantity: 100,
      discount: 1,
      currentPrice: {
        bnb: 0.00030064,
        brl: 0.818463,
        usd: 0.147873
      },
      high24h: {
        bnb: 0.00040848,
        brl: 1.09,
        usd: 0.196705
      },
      low24h: {
        bnb: 0.00030322,
        brl: 0.822898,
        usd: 0.148674
      }
    }
  ]
}

export default state

interface RootState {}

interface CounterState {
  counter: number
}

interface CurrentPrice {
  bnb: number
  brl: number
  usd: number
}

interface CryptoLimit {
  sell: undefined | number
  buy: undefined | number
  buyPercent: number
  sellPercent: number
}

interface CryptoCoin {
  id: string
  name: string
  symbol: string
  image: string
  status: string
  currentPrice: CurrentPrice
  high24h: CurrentPrice
  low24h: CurrentPrice
  monitor: boolean
  limitBuy: undefined | number
  notifyTimesBuy: number
  limitSell: undefined | number
  notifyTimesSell: number
  quantity: number
  discount: number
}

interface CryptoState {
  coinType: string
  coins: CryptoCoin[]
}

type CryptoCoinResume = {
  id: string
  name: string
  symbol: string
  image: string
  price: number
  high24h: number
  low24h: number
}

type SetQuantityPayload = {
  id: string
  quantity: number
  discount: number
}

type SetStatusPayload = {
  id: string
  status: string
}

type SetLimitPayload = {
  id: string
  limitBuy: undefined | number
  limitSell: undefined | number
}

type SetSwapPayload = {
  id: string
  quantity: number
  discount: number
}

type SetMonitorPayload = {
  id: string
  limitBuy: number
  limitSell: number
  monitor: boolean
}

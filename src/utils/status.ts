enum Status {
  HOLD = 'Hold',
  BUY = 'Buy',
  SELL = 'Sell'
}

export const statusCalculate = ({
  price,
  high,
  low
}: StatusParams): StatusResult => {
  const limit = 15
  const percent = (high - low) / 100
  const limitBuy = percent * limit + low
  const limitSell = high - percent * limit
  const percentPrice = price - low
  console.log('price', price, 'low', low, 'percent', percentPrice)
  if (price < limitBuy) {
    return { status: Status.BUY, percent: percentPrice }
  }
  if (price > limitSell) {
    return { status: Status.SELL, percent: percentPrice }
  }
  return { status: Status.HOLD, percent: percentPrice }
}

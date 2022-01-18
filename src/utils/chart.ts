type MapperCharts = {
  width: number
  height: number
  data: number[]
}

export const mapperCharts = ({ width, height, data }: MapperCharts) => {
  const min = Math.min(...data)
  const max = Math.max(...data)
  const slice = height / 100
  const range = max - min
  const percent = range / 100
  const list: number[] = []
  let x = 0
  for (let value of data.map(item =>
    Math.round(((max - item) / percent) * slice)
  )) {
    list.push(x)
    list.push(value)
    x += width / data.length
  }
  return list
}

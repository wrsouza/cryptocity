export const dataWrite = (value: any, key: string) => {
  localStorage.setItem(key, JSON.stringify(value))
}

export const dataRead = (key: string) => {
  const value = localStorage.getItem(key)
  if (value) {
    return JSON.parse(value)
  }
  return null
}

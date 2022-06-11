export const getCurrentQueryData = async (query) => {
  const url = `http://localhost:3001/${query}`
  console.log(url)
  const res = await fetch(url)
  const data = await res.json()
  return data
}

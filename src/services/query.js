export const getCurrentQueryData = async (query) => {
  const url = `https://sql-query-gui.herokuapp.com/${query}`
  console.log(url)
  const res = await fetch(url)
  const data = await res.json()
  return data
}

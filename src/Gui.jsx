import React, { useEffect, useState } from 'react'
import './App'
import dummyData from './data/json/categories.json'

const submitQuery = (e) => {
  e.preventDefault()
  // setQuery()
}

const resetQuery = (e) => {
  e.preventDefault()
}

const getCurrentQueryData = async (query) => {
  const url = `./data/json/${query}.json`
  console.log(url)
  const res = await fetch(url)
  const data = await res.json()
  return data
}
const Gui = (e) => {
  const [query, setQuery] = useState('categories')
  const [data, setData] = useState({
    payload: null,
    loading: false,
    error: false,
  })

  const handleQuery = async (e) => {
    e.preventDefault()
    try {
      setData({ loading: true })
      // const data = await getCurrentQueryData(query)
      const data = dummyData
      setData({ payload: data })
    } catch (error) {
      console.log(error)
      console.log(error)
      setData({ error })
    }
  }

  useEffect(() => {
    console.log(data)
  }, [data.payload, data.error])
  return (
    <div className='guiContainer'>
      <h1>SQL GUI </h1>
      <div className='formContainer'>
        <form>
          <textarea
            name=''
            // value={query}
            id=''
            cols='100'
            rows='15'
            className='textareaContainer'
            onChange={(e) => setQuery(e.target.value)}
          ></textarea>
          <button className='btn' onClick={handleQuery}>
            GET QUERY
          </button>
          <button className='btn' onClick={submitQuery}>
            SUBMIT
          </button>
          <button className='btn' onClick={resetQuery}>
            RESET
          </button>
        </form>
      </div>
    </div>
  )
}

export default Gui

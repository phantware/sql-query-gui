import React, { useEffect, useState } from 'react'
import './App'
import dummyData from './data/json/customers.json'
import Table from './Table'

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
  const resetQuery = (e) => {
    e.preventDefault()
    setData(' ')
  }
  const submitQuery = (e) => {
    e.preventDefault()
    // setQuery()
  }

  useEffect(() => {}, [data.payload, data.error])
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
            rows='10'
            className='textareaContainer'
            onChange={(e) => setQuery(e.target.value)}
          ></textarea>
          <br />
          <button className='btn2' onClick={submitQuery}>
            SUBMIT
          </button>
          <button className='btn2' onClick={resetQuery}>
            RESET
          </button>
          <br />
          <button className='btn' onClick={handleQuery}>
            GET QUERY
          </button>
          <label>Select to from the list:</label>
          <select>
            <option value='categories'>Categories</option>
            <option value='customer'>Customer</option>
            <option value='employees'>Employees</option>
            <option value='orders'>Orders</option>
            <option value='products'>Products</option>
            <option value='regions'>Regions</option>
            <option value='shippers'>Shippers</option>
            <option value='suppliers'>Suppliers</option>
          </select>
          {data.payload && <Table payload={data.payload} />}
        </form>
      </div>
    </div>
  )
}

export default Gui

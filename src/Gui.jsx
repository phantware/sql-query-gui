import React, { useEffect, useState } from 'react'
import './App'
import Table from './Table'
import { getCurrentQueryData } from './services/query'

const Gui = (e) => {
  const [query, setQuery] = useState('categories')
  const [data, setData] = useState({
    payload: null,
    loading: false,
    error: false,
  })

  const handleQuery = async (query) => {
    console.log(query)
    try {
      setData({ loading: true })
      const data = await getCurrentQueryData(query)
      setData({ payload: data })
    } catch (error) {
      console.log(error)
      setData({ error: error.message })
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

  const [selectedQuery, setSelectedQuery] = React.useState('')
  const handleChange = (event) => {
    setSelectedQuery(event.target.value)
  }
  useEffect(() => {
    if (data.error) {
      alert('Something went wrong: ' + data.error)
    }
  }, [data.error])

  // useEffect(() => {
  //   if (selectedQuery) {
  //     handleQuery()
  //   }
  // }, [selectedQuery])

  return (
    <div className='guiContainer'>
      <h1>SQL GUI </h1>
      <div className='formContainer'>
        <div>
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
          <button className='btn' onClick={() => handleQuery(selectedQuery)}>
            GET QUERY
          </button>
          <label>Select to from the list:</label>

          <select value={selectedQuery} onChange={handleChange}>
            <option value=''>select</option>
            {selectQueries_data.map((opt) => (
              <option value={opt.value}>{opt.label}</option>
            ))}
          </select>

          {data.payload && <Table payload={data.payload} />}
        </div>
      </div>
    </div>
  )
}

const selectQueries_data = [
  { value: 'categories', label: 'Categories' },
  { value: 'customers', label: 'Customers' },
  { value: 'employees', label: 'Employees' },
  { value: 'orders', label: 'Orders' },
  { value: 'products', label: 'Products' },
  { value: 'regions', label: 'Regions' },
  { value: 'shippers', label: 'Shippers' },
  { value: 'suppliers', label: 'Suppliers' },
]

export default Gui

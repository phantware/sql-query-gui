import React, { useEffect, useState } from 'react'
import './App'
import Table from './Table'
import { getCurrentQueryData } from './services/query'

const Gui = (e) => {
  const [data, setData] = useState({
    payload: null,
    loading: false,
    error: false,
  })

  // textarea
  const [textAreaValue, setTextAreaValue] = React.useState('')
  const handleTextAreaValueChange = (e) => {
    // don't change when '\n' value is changed
    if (e.target.value.includes('\n')) return
    setTextAreaValue(e.target.value)
  }

  const handleTextAreaValueSubmit = () => {
    if (
      !/^SELECT \* from (categories|customers|employees|orders|products|regions|shippers|suppliers)(\sWHERE [a-zA-Z0-9]+ = .+)?$/.test(
        textAreaValue
      )
    )
      return alert('Invalid Query or Syntax Error!')

    const query = textAreaValue.split(' ')[3]
    const whereKey = textAreaValue.split(' ')[5]
    const whereValue = textAreaValue.split(' ')[7]
    handleQuery(setData, query, whereKey, whereValue)
  }

  const resetQuery = (e) => {
    e.preventDefault()
    setData([])
    setTextAreaValue('')
    setSelectedQuery('')
  }

  const [selectedQuery, setSelectedQuery] = React.useState('')
  const handleSelectQueryChange = (event) => {
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
            value={textAreaValue}
            id=''
            cols='100'
            rows='10'
            className='textareaContainer'
            onChange={handleTextAreaValueChange}
          ></textarea>
          <br />
          <button className='btn2' onClick={handleTextAreaValueSubmit}>
            SUBMIT
          </button>
          <button className='btn2' onClick={resetQuery}>
            RESET
          </button>
          <br />
          <button
            className='btn'
            onClick={() => handleQuery(setData, selectedQuery)}
          >
            GET QUERY
          </button>
          <label>Select to from the list:</label>
          <select value={selectedQuery} onChange={handleSelectQueryChange}>
            <option value=''>select</option>
            {selectQueries_data.map((opt) => (
              <option value={opt.value}>{opt.label}</option>
            ))}
          </select>
          {data.payload?.length ? <Table payload={data.payload} /> : null}
        </div>
      </div>
    </div>
  )
}
const handleQuery = async (setData, query, whereKey, whereValue) => {
  console.log(query)
  try {
    setData({ loading: true })
    let data = await getCurrentQueryData(query)
    if (whereKey)
      data = data.filter((user) => `${user[whereKey]}` === `${whereValue}`)
    if (!data.length) alert('No Entries Found!')

    setData({ payload: data })
  } catch (error) {
    console.log(error)
    setData({ error: error.message })
  }
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

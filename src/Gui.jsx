import React, { useEffect, useState } from 'react'
import './App'
import csvToJson from 'csvtojson'

const submitQuery = (e) => {
  e.preventDefault()
  // setQuery()
}

const resetQuery = (e) => {
  e.preventDefault()
}

const getCurrentQueryData = (query) => {
  const csvFilePath = `./data/csv/${query}.csv`

  csvToJson()
    .fromFile(csvFilePath)
    .then((jsonObj) => {
      console.log(jsonObj)
    })
}
const Gui = (e) => {
  const [query, setQuery] = useState('Hello')
  // console.log(query)

  useEffect(() => {
    // setQuery()
  }, [])
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
          <button
            className='btn'
            onClick={() => getCurrentQueryData('categories')}
          >
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

const Table = ({ payload }) => {
  const columns = Object.keys(payload[0])
    .filter((key) => !Array.isArray(payload[0][key]))
    .map((key) => ({ id: key }))
  return (
    <table className='table'>
      <thead>
        <tr>
          {columns.map((column) => (
            <th>{column.id}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {payload.map((datum) => (
          <tr>
            {columns.map((column) => (
              <td>
                {typeof datum[column.id] === 'object'
                  ? datum[column.id][Object.keys(datum[column.id])[0]]
                  : datum[column.id]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Table

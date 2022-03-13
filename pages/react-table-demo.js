/* eslint-disable react/jsx-key */
import { useTable } from "react-table";
import React, {useState, useEffect} from "react";


export default function App() {
   /*const [sales, setSales ]= useState();
    useEffect(() => {
    fetch("api/getAllTestsHandler")
    .then((response) => response.json())
    .then((data) => {
      //data from firebase will be returned as an object and nested ones
      const transformedSales = []; // to transform an object into an array
      for (const key in data) {
        transformedSales.push({
          col1: data[key].id,
          col2: data[key].testName,
        });
      }
      setSales(transformedSales);
    });
}, []);*/ 
const [data, setData] = useState([]);

// Using useEffect to call the API once mounted and set the data
useEffect(() => {
    fetch("api/getAllTestsHandler")
    .then((response) => response.json())
    .then((data) => {
      //data from firebase will be returned as an object and nested ones
      const transformedSales = []; // to transform an object into an array
      for (const key in data) {
        transformedSales.push({
          col1: data[key].id,
          col2: data[key].testName,
        });
      }
      setData(transformedSales);
      console.log(data)
    });
}, [])






  

  const columns = React.useMemo(
    () => [
      {
        Header: "Column 1",
        accessor: "col1", // accessor is the "key" in the data
      },
      {
        Header: "Column 2",
        accessor: "col2",
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <table {...getTableProps()} style={{ border: 'solid 1px blue' }}>
    <thead>
      {headerGroups.map(headerGroup => (
        <tr {...headerGroup.getHeaderGroupProps()}>
          {headerGroup.headers.map(column => (
            <th
              {...column.getHeaderProps()}
              style={{
                borderBottom: 'solid 3px red',
                background: 'aliceblue',
                color: 'black',
                fontWeight: 'bold',
              }}
            >
              {column.render('Header')}
            </th>
          ))}
        </tr>
      ))}
    </thead>
    <tbody {...getTableBodyProps()}>
      {rows.map(row => {
        prepareRow(row)
        return (
          <tr {...row.getRowProps()}>
            {row.cells.map(cell => {
              return (
                <td
                  {...cell.getCellProps()}
                  style={{
                    padding: '10px',
                    border: 'solid 1px gray',
                    background: 'papayawhip',
                  }}
                >
                  {cell.render('Cell')}
                </td>
              )
            })}
          </tr>
        )
      })}
    </tbody>
  </table>
)
  
}

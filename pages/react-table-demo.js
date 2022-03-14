/* eslint-disable react/jsx-key */
import { useTable, useFilters, useSortBy } from "react-table";
import React, {useState, useEffect, Fragment} from "react";

const handleChange = (e, rowTestName, rowIndex ) => {
  

 const { value } = e.target;
//still to work on:const itemToChange = data.find((item)=>item.testName ==)
 
console.log("rowtestname",rowTestName)
 
console.log("rowIndex",rowIndex)
//  const newData = [...data];
//  newData[index] = {
//    ...newData[index],
//    [name]: value,
//  };
//  console.log("newData", newData);
//     data = newData;
//     console.log("data", data);
//     return data;
};

export default function App() {



const [filterInput, setFilterInput] = useState("");


// Update the state when input changes
const handleFilterChange = e => {
    const value = e.target.value || undefined;
    setFilter("col2", value); // Update the show.name filter. Now our table will filter and show only the rows which have a matching value

    setFilterInput(value);
  };

  const handleFilterChangeById = e => {
    const value = e.target.value || undefined;
    setFilter("col1", value); // Update the show.name filter. Now our table will filter and show only the rows which have a matching value

    setFilterInput(value);
  };


const [data, setData] = useState([]);

// Using useEffect to call the API once mounted and set the data
useEffect( () => {
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
      {
        Header: "Genre(s)",
        accessor: "col3",
      

        // Cell method will provide the cell value; we pass it to render a custom component
        Cell: ({ cell: { row,value } }) =>    <input
        type="number"
        onChange={(value) => handleChange(value, row.original.col2, row.original.col1)}
      />
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow ,  setFilter // The useFilter Hook provides a way to set the filter
} =
    useTable({ columns, data }, useFilters, useSortBy);

  return (
<Fragment>
    <input
    value={filterInput}
    onChange={handleFilterChange}
    placeholder={"Search testname"}
  />
  <input
    value={filterInput}
    onChange={handleFilterChangeById}
    placeholder={"Search id"}
  />

    <table {...getTableProps()} style={{ border: 'solid 1px blue' }}>
  


    <thead>
  
      {headerGroups.map(headerGroup => (
        <tr {...headerGroup.getHeaderGroupProps()}>
          {headerGroup.headers.map(column => (
            <th
              {...column.getHeaderProps(column.getSortByToggleProps())}
              style={{
                borderBottom: 'solid 3px red',
                background: 'aliceblue',
                color: 'black',
                fontWeight: 'bold',
              }}>
              {column.render('Header')}
              {/* Add a sort direction indicator */}
              <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽 descending'
                        : ' 🔼 ascending'
                      : ''}
                  </span>
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
  </Fragment>
)
  
}

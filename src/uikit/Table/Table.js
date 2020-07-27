import React from 'react';
import { useTable } from 'react-table';
import './table.scss';

export const Table = ({columns, data, onRowClick, isLoading, isError}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data, initialState: {hiddenColumns: 'uuid'} });

  return (
    <>
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th
                {...column.getHeaderProps()}
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
            <tr className="trow" {...row.getRowProps({onClick: () => onRowClick(row.values)})}>
              {row.cells.map(cell => {
                return (
                  <td
                    {...cell.getCellProps()}
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
    {isLoading ? (
      <div className="center-loading">Sedang Memuat ...</div>
    ) : isError ? (
      <div className="center-loading">Terjadi Error Saat Memuat Data</div>
    ) : !data.length ? (
      <div className="center-loading">Data Tidak Ditemukan</div>
    ) : null} 
    </>
  )
}
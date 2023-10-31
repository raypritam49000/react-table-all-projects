import React, { useMemo, useState } from 'react'
import { useTable, usePagination, useSortBy, useFilters, useGlobalFilter, useColumnOrder } from 'react-table'
import './Table.css'


export interface Column {
    Header: string;
    accessor: string,
    Footer?: string,
    Filter?: React.FC<{ column: any }>;
    disableSortBy?: boolean;
}

export interface Row {
    [key: string]: any;
}

export interface BasicTableProps {
    columns: Column[];
    data: Row[];
    globalFilterEnabled?: boolean;
}

const ReactDataTable: React.FC<BasicTableProps> = ({ columns, data, globalFilterEnabled }) => {

    const columnsMemo = useMemo(() => columns, [])
    const dataMemo = useMemo(() => data, [])

    const [globalFilter, setGlobalFilter] = useState<string | ''>('');

    const tableInstance = useTable({ columns: columnsMemo, data: dataMemo, initialState: { pageIndex: 0 } }, useGlobalFilter, useFilters, useSortBy, usePagination, useColumnOrder);

    const { getTableProps, getTableBodyProps, headerGroups, footerGroups, page, nextPage, previousPage, canPreviousPage, canNextPage, pageOptions, state, gotoPage, pageCount, setPageSize, prepareRow, setGlobalFilter: setTableGlobalFilter, setColumnOrder } = tableInstance;

    const { pageIndex, pageSize } = state

    const changeOrder = () => {
        setColumnOrder(['id', 'first_name', 'last_name', 'phone', 'country', 'date_of_birth'])
    }

    return (
        <div>

            {globalFilterEnabled && (
                <input
                    type="text"
                    value={globalFilter}
                    onChange={(e) => {
                        setGlobalFilter(e.target.value || '');
                        setTableGlobalFilter(e.target.value || '');
                    }}
                    placeholder="Global Filter..."
                    className="global-filter-input"
                />
            )}

            <button className='change-order-button' onClick={changeOrder}>Change column order</button>

            <table {...getTableProps()}>

                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                    {column.render('Header')}
                                    {column.disableSortBy ? null : column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ' ↕️'}
                                    <div>{column.canFilter ? column.render('Filter') : null}</div>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>

                <tbody {...getTableBodyProps()}>
                    {page.map(row => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                })}
                            </tr>
                        )
                    })}
                </tbody>

                <tfoot>
                    {footerGroups.map(footerGroup => (
                        <tr {...footerGroup.getFooterGroupProps()} className="footer-row">
                            {footerGroup.headers.map(column => (
                                <td {...column.getFooterProps()} className="footer-cell">{column.render('Footer')}</td>
                            ))}
                        </tr>
                    ))}
                </tfoot>

            </table>

            <div className="pagination-container">
                <button onClick={() => gotoPage(0)} disabled={!canPreviousPage} className="pagination-button">
                    {'<<'}
                </button>{' '}
                <button onClick={() => previousPage()} disabled={!canPreviousPage} className="pagination-button">
                    Previous
                </button>{' '}
                <button onClick={() => nextPage()} disabled={!canNextPage} className="pagination-button">
                    Next
                </button>{' '}
                <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage} className="pagination-button">
                    {'>>'}
                </button>{' '}
                <span>
                    Page{' '}
                    <strong>
                        {pageIndex + 1} of {pageOptions.length}
                    </strong>{' '}
                </span>
                <span>
                    | Go to page:{' '}
                    <input
                        className="pagination-input"
                        type='number'
                        defaultValue={pageIndex + 1}
                        onChange={e => {
                            const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0
                            gotoPage(pageNumber)
                        }}
                        style={{ width: '50px' }}
                    />
                </span>{' '}
                <select
                    className="pagination-select"
                    value={pageSize}
                    onChange={e => setPageSize(Number(e.target.value))}>
                    {[10, 20, 30, 40, 50, 100].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </select>
            </div>

        </div>
    )
}

export default ReactDataTable;

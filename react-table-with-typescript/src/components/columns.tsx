import { Column } from "./ReactDataTable";
import { DefaultColumnFilter } from "./DefaultColumnFilter";


export const COLUMNS: Column[] = [
    {
        Header: 'Id',
        accessor: 'id',
        Footer: 'Id',
        Filter: DefaultColumnFilter,
        disableSortBy: true
    },
    {
        Header: 'First Name',
        accessor: 'first_name',
        Footer: 'First Name',
        Filter: DefaultColumnFilter
    },
    {
        Header: 'Last Name',
        accessor: 'last_name',
        Footer: 'Last Name',
        Filter: DefaultColumnFilter
    },
    {
        Header: 'Date of Birth',
        accessor: 'date_of_birth',
        Footer: 'Date of Birth',
        Filter: DefaultColumnFilter,
        disableSortBy: true
    },
    {
        Header: 'Country',
        accessor: 'country',
        Footer: 'Country',
        Filter: DefaultColumnFilter
    },
    {
        Header: 'Phone',
        accessor: 'phone',
        Footer: 'Phone',
        Filter: DefaultColumnFilter
    },
]
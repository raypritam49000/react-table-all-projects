import React from 'react';
import { ColumnInstance } from 'react-table';

interface DefaultColumnFilterProps {
    column: ColumnInstance;
}

export const DefaultColumnFilter: React.FC<DefaultColumnFilterProps> = ({ column }) => {
    return (
        <input
            value={column.filterValue || ''}
            onChange={(e) => column.setFilter(e.target.value || undefined)}
            placeholder="Filter..."
        />
    );
};
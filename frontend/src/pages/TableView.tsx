// TableView.tsx
import React from 'react';
import UserTable from '@/components/UserTable';

const TableView: React.FC = () => {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-xl font-bold mb-4">Users</h1>
            <UserTable />
        </div>
    );
};

export default TableView;

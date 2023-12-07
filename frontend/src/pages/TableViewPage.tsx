// TableView.tsx
import React from 'react';
import UserTable from '@/components/UserTable';
import LinkButton from "@/components/LinkButton"

const TableView: React.FC = () => {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-xl font-bold mb-6">Users</h1>
            <div className="absolute top-0 right-0 mt-6 mr-6">
                <LinkButton className='bg-fuchsia-300' to='/'>Back to main page</LinkButton>
            </div>
            <UserTable />
        </div>
    );
};

export default TableView;

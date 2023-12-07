// UserTable.tsx
import React, { useState, useEffect } from 'react';

interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    dateOfBirth: Date | string;
    genderMale: boolean;
}

type SortDirection = 'asc' | 'desc' | 'none';
type SortField = keyof User | null;

const UserTable: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [page, setPage] = useState<number>(0);
    const [size, setSize] = useState<number>(2);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [sortField, setSortField] = useState<SortField>(null);
    const [sortDirection, setSortDirection] = useState<SortDirection>('none');

    useEffect(() => {
        fetch(`/api/user/paginated?page=${page}&size=${size}`)
            .then(response => response.json())
            .then(data => {
                setUsers(data.content);
                setTotalPages(data.totalPages);
            })
            .catch(error => console.error('Error fetching data: ', error));
    }, [page, size]);

    const sortData = (field: SortField) => {
        if (field === sortField) {
            setSortDirection(prevDirection =>
                prevDirection === 'asc' ? 'desc' : prevDirection === 'desc' ? 'none' : 'asc'
            );
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    useEffect(() => {
        if (sortField !== null) {
            const sortedData = [...users].sort((a, b) => {
                if (a[sortField] < b[sortField]) return sortDirection === 'asc' ? -1 : sortDirection === 'desc' ? 1 : 0;
                if (a[sortField] > b[sortField]) return sortDirection === 'asc' ? 1 : sortDirection === 'desc' ? -1 : 0;
                return 0;
            });
            setUsers(sortedData);
        }
    }, [sortField, sortDirection]);

    const renderSortArrow = (field: keyof User) => {
        return (
            <span className={sortField === field ? 'font-bold' : ''}>
                {sortDirection === 'asc' ? '↑' : '↓'}
            </span>
        );
    };

    return (
        <div className="container mx-auto p-4 bg-fuchsia-50 rounded-xl shadow-lg">
            <table className="min-w-full leading-normal">
                <thead>
                <tr className="text-fuchsia-600 font-bold">
                    <th className="cursor-pointer" onClick={() => sortData('firstName')}>First Name {renderSortArrow('firstName')}</th>
                    <th className="cursor-pointer" onClick={() => sortData('lastName')}>Last Name {renderSortArrow('lastName')}</th>
                    <th className="cursor-pointer" onClick={() => sortData('email')}>Email {renderSortArrow('email')}</th>
                    <th>Date of Birth</th>
                    <th>Gender</th>
                </tr>
                </thead>
                <tbody>
                {users.map(user => (
                    <tr key={user.id} className="border-b border-fuchsia-200">
                        <td className="p-2">{user.firstName}</td>
                        <td className="p-2">{user.lastName}</td>
                        <td className="p-2">{user.email}</td>
                        <td className="p-2">{String(user.dateOfBirth)}</td>
                        <td className="p-2">{user.genderMale ? 'Male' : 'Female'}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="pagination flex justify-center mt-4">
                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i}
                        onClick={() => setPage(i)}
                        className="m-1 bg-fuchsia-300 rounded px-3 py-1 hover:bg-fuchsia-400 focus:outline-none focus:ring-2 focus:ring-fuchsia-300 focus:ring-opacity-50"
                    >
                        {i + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default UserTable;

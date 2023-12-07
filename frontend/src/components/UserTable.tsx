// UserTable.tsx
import React, { useState, useEffect } from 'react';

interface User {
    firstName: string;
    lastName: string;
    email: string;
    passwordHash: string;
    dateOfBirth: Date | string;
    genderMale: boolean;
}

const UserTable: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [page, setPage] = useState<number>(0);
    const [size, setSize] = useState<number>(2);
    const [sortBy, setSortBy] = useState<string>('id');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
    const [totalPages, setTotalPages] = useState<number>(0);

    useEffect(() => {
        fetch(`/api/user/paginated?page=${page}&size=${size}&sortBy=${sortBy}&sortDir=${sortDirection}`)
            .then(response => response.json())
            .then(data => {
                setUsers(data.content);
                setTotalPages(data.totalPages);
            })
            .catch(error => console.error('Error fetching data: ', error));
    }, [page, size, sortBy, sortDirection]);

    const handleSort = (field: string) => {
        setSortBy(field);
        setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    };

    return (
        <div className="container mx-auto p-4 bg-fuchsia-50 rounded-xl shadow-lg">
            <table className="min-w-full leading-normal">
                <thead>
                <tr className="text-fuchsia-600 font-bold">
                    <th className="cursor-pointer" onClick={() => handleSort('firstName')}>First Name</th>
                    <th className="cursor-pointer" onClick={() => handleSort('lastName')}>Last Name</th>
                    <th className="cursor-pointer" onClick={() => handleSort('email')}>Email</th>
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
                        <td className="p-2">{user.dateOfBirth}</td>
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
                        className="m-1 bg-fuchsia-300 rounded px-3 py-1 hover:bg-fuchsia-400"
                    >
                        {i + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default UserTable;

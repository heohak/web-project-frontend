import React, {useState, useEffect} from 'react';

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
    const [searchTerm, setSearchTerm] = useState<string>('');

    useEffect(() => {
        const fetchUsers = async () => {
            const searchParam = searchTerm ? `&search=${encodeURIComponent(searchTerm)}` : '';
            const response = await fetch(
                `/api/user/paginated?page=${page}&size=${size}${searchParam}`,
                {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem("token")
                    },
                }
            );
            const data = await response.json();
            const fetchedUsers = data.content;

            if (sortField && sortDirection !== 'none') {
                fetchedUsers.sort((a: User, b: User) => {
                    if (a[sortField] < b[sortField]) return sortDirection === 'asc' ? -1 : 1;
                    if (a[sortField] > b[sortField]) return sortDirection === 'asc' ? 1 : -1;
                    return 0;
                });
            }

            setUsers(fetchedUsers);
            setTotalPages(data.totalPages);
        };

        fetchUsers();
    }, [page, size, sortField, sortDirection, searchTerm]);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const target = event.target as HTMLInputElement;  // Explicit type assertion
        setSearchTerm(target.value);
        setPage(0);
    };


    const sortData = (field: SortField) => {
        if (field === sortField) {
            setSortDirection(prevDirection => prevDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };


    const renderSortArrow = (field: keyof User) => {
        return (
            <span className={sortField === field ? 'font-bold' : ''}>
            {sortField === field && (sortDirection === 'asc' ? '↑' : '↓')}
        </span>
        );
    };


    return (
        <div className="container mx-auto p-4 bg-fuchsia-50 rounded-xl shadow-lg">
            <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="mb-4 p-2 border border-fuchsia-600"
            />
            <table className="min-w-full leading-normal">
                <thead>
                <tr className="text-fuchsia-600 font-bold">
                    <th className="cursor-pointer" onClick={() => sortData('firstName')}>First
                        Name {renderSortArrow('firstName')}</th>
                    <th className="cursor-pointer" onClick={() => sortData('lastName')}>Last
                        Name {renderSortArrow('lastName')}</th>
                    <th className="cursor-pointer"
                        onClick={() => sortData('email')}>Email {renderSortArrow('email')}</th>
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
                {Array.from({length: totalPages}, (_, i) => (
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

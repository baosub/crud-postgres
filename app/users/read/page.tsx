'use client';

import { useEffect, useState } from 'react';

interface User {
  id: number;
  nombre: string;
  edad: number;
}

const ReadUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch('/api/users/read');
      if (res.ok) {
        const data: User[] = await res.json();
        setUsers(data);
      } else {
        setMessage('Error fetching users');
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h1>All Users</h1>
      {message && <p>{message}</p>}
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.nombre} - {user.edad} años
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReadUsers;

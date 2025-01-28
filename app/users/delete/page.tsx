'use client'
import { useState, useEffect } from 'react';

type User = {
  id: number;
  nombre: string;
  edad: number;
};

const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch('/api/users/delete')
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error('Error al cargar usuarios', error));
  }, []);

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch('/api/users/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        setUsers(users.filter((user) => user.id !== id));
      } else {
        console.error('Error al eliminar usuario');
      }
    } catch (error) {
      console.error('Error al eliminar usuario', error);
    }
  };

  return (
    <div>
      <h1>Lista de Usuarios</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.nombre} ({user.edad} años)
            <button onClick={() => handleDelete(user.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;


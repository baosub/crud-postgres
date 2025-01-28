'use client';

import { useState } from 'react';

interface User {
  id: number;
  nombre: string;
  edad: number;
}

const UpdateUser = () => {
  const [id, setId] = useState<number | undefined>(undefined);
  const [nombre, setNombre] = useState<string>('');
  const [edad, setEdad] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/users/update', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, nombre, edad: parseInt(edad, 10) }),
    });
    if (res.ok) {
      const user: User = await res.json();
      setMessage(`User updated: ${user.nombre}, ${user.edad}`);
      setId(undefined);
      setNombre('');
      setEdad('');
    } else {
      setMessage('Error updating user');
    }
  };

  return (
    <div>
      <h1>Update User</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          value={id ?? ''}
          onChange={(e) => setId(parseInt(e.target.value, 10))}
          placeholder="ID del Usuario"
          required
        />
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Nombre"
          required
        />
        <input
          type="number"
          value={edad}
          onChange={(e) => setEdad(e.target.value)}
          placeholder="Edad"
          required
        />
        <button type="submit">Update</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UpdateUser;

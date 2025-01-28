'use client';

import { useState } from 'react';

interface User {
  nombre: string;
  edad: number;
}

const CreateUser = () => {
  const [nombre, setNombre] = useState<string>('');
  const [edad, setEdad] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const user: User = { nombre, edad: parseInt(edad, 10) };
    const res = await fetch('/api/users/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    if (res.ok) {
      const createdUser: User = await res.json();
      setMessage(`User created: ${createdUser.nombre}, ${createdUser.edad}`);
      setNombre('');
      setEdad('');
    } else {
      setMessage('Error creating user');
    }
  };

  return (
    <div>
      <h1>Create User</h1>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Create</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default CreateUser;

import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

interface User {
  _id: string;
  name: string;
  email: string;
  status: string;
}

function App() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [users, setUsers] = useState<User[]>([]);

  // Fetch all users when the component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users', error);
    }
  };

  const handleAddUser = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/users', {
        name: nome,
        email: email,
      });
      setUsers([...users, response.data]);
      setNome('');
      setEmail('');
    } catch (error) {
      console.error('Error creating user', error);
    }
  };

  const handleDeleteUser = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`);
      setUsers(users.filter(user => user._id !== id));
    } catch (error) {
      console.error('Error deleting user', error);
    }
  };

  return (
    <div className="App">
      <h1>Clientes</h1>

      <div className="form">
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={handleAddUser}>Cadastrar</button>
      </div>

      <div className="user-list">
        {users.map((user) => (
          <div key={user._id} className="user-card">
            <p>
              <strong>Nome:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Status:</strong> {user.status || 'ATIVO'}
            </p>
            <button onClick={() => handleDeleteUser(user._id)} className="delete-btn">
              <span role="img" aria-label="delete">
                ❌
              </span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

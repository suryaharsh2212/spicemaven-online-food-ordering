import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function RestroLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === 'suryaharsh279@gmail.com' && password === 'Surya@2212') {
      setMessage(' Login successful!');
      navigate('/restro-order');
    } else {
      setMessage(' Invalid email or password');
      alert('Invalid email or password');
      setEmail(''); 
      setPassword(''); 
    }
  };

  return (
    <div className="max-w-md h-80 w-full mx-auto mt-10 p-4 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Restro Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="block font-medium">Email:</label>
          <input
            type="email"
            id="email"
            className="w-full border px-3 py-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="block font-medium">Password:</label>
          <input
            type="password"
            id="password"
            className="w-full border px-3 py-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">
          Login
        </button>
      </form>
      {message && <p className="mt-4 font-medium text-center">{message}</p>}
    </div>
  );
}

export default RestroLogin;

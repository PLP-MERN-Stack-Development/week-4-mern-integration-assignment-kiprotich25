import { useState } from 'react';
import { authService } from '../services/api';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await authService.login(credentials);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Login</h2>
      {error && <p className="text-red-600 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="email" name="email" placeholder="Email" value={credentials.email}
          onChange={handleChange} className="w-full border rounded p-2" required />
        <input type="password" name="password" placeholder="Password" value={credentials.password}
          onChange={handleChange} className="w-full border rounded p-2" required />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded w-full">Login</button>
      </form>
    </div>
  );
}

export default Login;

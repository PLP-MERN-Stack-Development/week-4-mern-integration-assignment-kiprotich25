import { useState } from 'react';
import { authService } from '../services/api';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [formData, setFormData] = useState( { username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await authService.signup(formData);
      navigate('/login');
    } catch (error) {
      setError(error.response?.data?.error || 'Registration failed');
      console.error(error.response?.data || error.message);

    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Signup</h2>
      {error && <p className="text-red-600 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="username" placeholder="Username" value={formData.username}
          onChange={handleChange} className="w-full border rounded p-2" required />
        <input type="email" name="email" placeholder="Email" value={formData.email}
          onChange={handleChange} className="w-full border rounded p-2" required />
        <input type="password" name="password" placeholder="Password" value={formData.password}
          onChange={handleChange} className="w-full border rounded p-2" required />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">Signup</button>
      </form>
    </div>
  );
}

export default Signup;

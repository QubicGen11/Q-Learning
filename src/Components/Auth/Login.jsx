import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  // Hardcoded credentials for demo purposes
  const DEMO_USERS = [
    { email: 'admin@gmail.com', password: 'admin123' },
    { email: 'user@gmail.com', password: 'user123' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check if user exists
    const user = DEMO_USERS.find(
      user => user.email === formData.email && user.password === formData.password
    );

    if (user) {
      // Store auth status in localStorage
      localStorage.setItem('authToken', 'demo-token');
      localStorage.setItem('user', JSON.stringify({ email: user.email }));
      navigate('/course-manager');
    } else {
      setError('Invalid credentials. Try admin@gmail.com / admin123');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center 
                    bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-md w-full space-y-8 p-8 
                    bg-white dark:bg-gray-800 
                    rounded-lg shadow-lg dark:shadow-blue-500/10">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold 
                       text-gray-900 dark:text-white transition-colors duration-300">
            Sign in to Course Manager
          </h2>
          {error && (
            <p className="mt-2 text-center text-sm text-red-600 dark:text-red-400">
              {error}
            </p>
          )}
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 
                         border border-gray-300 dark:border-gray-600 
                         placeholder-gray-500 dark:placeholder-gray-400 
                         text-gray-900 dark:text-white 
                         bg-white dark:bg-gray-700
                         rounded-t-md focus:outline-none 
                         focus:ring-blue-500 dark:focus:ring-blue-400 
                         focus:border-blue-500 dark:focus:border-blue-400 
                         focus:z-10 sm:text-sm
                         transition-colors duration-300"
                placeholder="Email address"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 
                         border border-gray-300 dark:border-gray-600 
                         placeholder-gray-500 dark:placeholder-gray-400 
                         text-gray-900 dark:text-white 
                         bg-white dark:bg-gray-700
                         rounded-b-md focus:outline-none 
                         focus:ring-blue-500 dark:focus:ring-blue-400 
                         focus:border-blue-500 dark:focus:border-blue-400 
                         focus:z-10 sm:text-sm
                         transition-colors duration-300"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 
                       border border-transparent text-sm font-medium rounded-md 
                       text-white bg-blue-600 hover:bg-blue-700 
                       focus:outline-none focus:ring-2 focus:ring-offset-2 
                       focus:ring-blue-500 dark:focus:ring-offset-gray-800
                       transition-colors duration-300 relative"
            >
              {/* Priority Glow Effect */}
              <div className="absolute inset-0 rounded-md bg-blue-500/50 blur-md 
                           opacity-0 group-hover:opacity-75 
                           transition-opacity duration-300 -z-10"></div>
              Sign in
            </button>
          </div>
          
          <div className="text-sm text-center space-y-2">
            <p className="text-gray-600 dark:text-gray-300">Demo Credentials:</p>
            <p className="text-gray-600 dark:text-gray-300">Email: admin@gmail.com</p>
            <p className="text-gray-600 dark:text-gray-300">Password: admin123</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login; 
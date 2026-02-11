import React, { useEffect, useState } from 'react';

const Dashboard = () => {
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    // 1. Check if user is authenticated
    const token = localStorage.getItem('access_token');
    const storedEmail = localStorage.getItem('user_email'); // Ensure you saved this during login
    
    if (!token) {
      // No token found? Redirect to login immediately
      window.location.href = '/login';
    } else {
      setUserEmail(storedEmail || 'User');
    }
  }, []);

  // 2. Logout Function
  const handleLogout = () => {
    // Clear all stored authentication data
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('token_type');
    localStorage.removeItem('user_email');
    
    // Redirect to login page
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 bg-indigo-600 rounded-lg flex items-center justify-center">
             <span className="text-white font-bold">D</span>
          </div>
          <span className="text-xl font-bold text-gray-800">Dashboard</span>
        </div>

        <div className="flex items-center space-x-6">
          <span className="hidden md:block text-sm text-gray-600">
            Logged in as: <span className="font-semibold text-gray-900">{userEmail}</span>
          </span>
          
          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2 rounded-lg font-medium transition duration-200 border border-red-200"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span>Logout</span>
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-10 px-6">
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome Back!</h2>
          <p className="text-gray-600">
            You have successfully logged into your account. Your session tokens are currently stored in your browser's local storage.
          </p>
          
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-100">
              <p className="text-indigo-600 text-xs font-bold uppercase tracking-wider">Status</p>
              <p className="text-lg font-semibold text-indigo-900">Active Session</p>
            </div>
            <div className="p-4 bg-green-50 rounded-xl border border-green-100">
              <p className="text-green-600 text-xs font-bold uppercase tracking-wider">Security</p>
              <p className="text-lg font-semibold text-green-900">Token Verified</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
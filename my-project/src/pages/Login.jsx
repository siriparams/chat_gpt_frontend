import React, { useEffect, useState } from 'react';

const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // 1. Check for token on component mount
    const token = localStorage.getItem('access_token');

    if (!token) {
      // If no token, kick them back to login
      window.location.href = '/login';
    } else {
      // 2. Optional: Fetch user data from backend using the token
      // For now, we'll simulate a logged-in user
      setUser({ email: localStorage.getItem('user_email') || 'User' });
    }
  }, []);

  const handleLogout = () => {
    // 3. Clear local storage and redirect
    localStorage.clear();
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-indigo-900 text-white hidden md:flex flex-col">
        <div className="p-6 text-2xl font-bold border-b border-indigo-800">
          MyApp
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <a href="#" className="block py-2.5 px-4 rounded bg-indigo-800 transition">Dashboard</a>
          <a href="#" className="block py-2.5 px-4 rounded hover:bg-indigo-800 transition">Profile</a>
          <a href="#" className="block py-2.5 px-4 rounded hover:bg-indigo-800 transition">Settings</a>
        </nav>
        <button
          onClick={handleLogout}
          className="m-4 p-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition"
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="bg-white shadow-sm py-4 px-8 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-800">Dashboard Overview</h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">Welcome, <strong>{user?.email}</strong></span>
            <div className="h-10 w-10 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold">
              {user?.email[0].toUpperCase()}
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Stats Card 1 */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-gray-500 text-sm font-medium uppercase">Total Projects</h3>
              <p className="text-3xl font-bold text-gray-900 mt-2">12</p>
            </div>
            {/* Stats Card 2 */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-gray-500 text-sm font-medium uppercase">Active Tasks</h3>
              <p className="text-3xl font-bold text-indigo-600 mt-2">5</p>
            </div>
            {/* Stats Card 3 */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-gray-500 text-sm font-medium uppercase">Messages</h3>
              <p className="text-3xl font-bold text-green-600 mt-2">3</p>
            </div>
          </div>

          <div className="mt-10 bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-800">Login Successful!</h2>
            <p className="text-gray-600 mt-2">Your tokens are securely stored in LocalStorage.</p>
            <div className="mt-6 flex justify-center space-x-2">
              <span className="px-3 py-1 bg-gray-100 text-xs font-mono rounded border border-gray-200">
                JWT Token Active
              </span>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
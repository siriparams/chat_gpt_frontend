import React, { useEffect, useState } from 'react';

const Dashboard = () => {
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    const storedEmail = localStorage.getItem('user_email');
    
    if (!token) {
      window.location.href = '/login';
    } else {
      setUserEmail(storedEmail || 'User');
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* 1. Sidebar */}
      <aside className="w-64 bg-slate-900 text-slate-300 hidden lg:flex flex-col border-r border-slate-800">
        <div className="p-6">
          <div className="flex items-center space-x-3 text-white">
            <div className="h-9 w-9 bg-indigo-600 rounded-xl flex items-center justify-center font-bold">D</div>
            <span className="text-xl font-black tracking-tight">DASHBOARD</span>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          <SidebarItem icon="📊" label="Overview" active />
          <SidebarItem icon="👤" label="My Profile" />
          <SidebarItem icon="🛡️" label="Security" />
          <SidebarItem icon="⚙️" label="Settings" />
        </nav>

        <div className="p-4 mt-auto">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-2 py-3 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-xl text-sm font-bold transition-all"
          >
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* 2. Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        
        {/* Page Header Area */}
        <div className="px-8 pt-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Welcome Back, {userEmail.split('@')[0]}!</h1>
            <p className="text-gray-500 text-sm">Here is a quick overview of your account status.</p>
          </div>
          <div className="flex items-center space-x-3">
             <div className="h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold border-2 border-white shadow-sm">
               {userEmail.charAt(0).toUpperCase()}
             </div>
          </div>
        </div>

        <div className="p-8 space-y-8">
          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard label="Account Status" value="Active" icon="✅" color="text-green-600" />
            <StatCard label="Security Level" value="High" icon="🔒" color="text-blue-600" />
            <StatCard label="Storage Used" value="1.2 GB" icon="☁️" color="text-indigo-600" />
          </div>

          {/* Activity Table Container */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
              <h3 className="font-bold text-gray-800">Recent Login History</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50 text-gray-400 text-xs uppercase font-bold">
                  <tr>
                    <th className="px-6 py-4">Event</th>
                    <th className="px-6 py-4">IP Address</th>
                    <th className="px-6 py-4">Time</th>
                    <th className="px-6 py-4 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <TableRow event="Successful Login" ip="127.0.0.1" time="Just Now" status="Success" />
                  <TableRow event="Token Refresh" ip="127.0.0.1" time="2h ago" status="Success" />
                  <TableRow event="Successful Login" ip="192.168.1.1" time="Yesterday" status="Success" />
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// --- Helper Components for Clean Code ---

const SidebarItem = ({ icon, label, active = false }) => (
  <button className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
    active ? 'bg-indigo-600 text-white shadow-lg' : 'hover:bg-slate-800 hover:text-white text-slate-400'
  }`}>
    <span>{icon}</span>
    <span>{label}</span>
  </button>
);

const StatCard = ({ label, value, icon, color }) => (
  <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between mb-2">
      <span className="text-gray-400 text-xs font-bold uppercase tracking-wider">{label}</span>
      <span className="text-xl">{icon}</span>
    </div>
    <p className={`text-2xl font-black ${color}`}>{value}</p>
  </div>
);

const TableRow = ({ event, ip, time, status }) => (
  <tr className="hover:bg-gray-50 transition-colors">
    <td className="px-6 py-4 text-sm font-medium text-gray-700">{event}</td>
    <td className="px-6 py-4 text-sm text-gray-500 font-mono">{ip}</td>
    <td className="px-6 py-4 text-sm text-gray-400">{time}</td>
    <td className="px-6 py-4 text-right">
      <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
        {status}
      </span>
    </td>
  </tr>
);

export default Dashboard;
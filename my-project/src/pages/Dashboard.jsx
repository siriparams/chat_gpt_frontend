import React, { useEffect, useState } from 'react';

const API_BASE = import.meta.env.VITE_API_BASE;

const Dashboard = () => {
  const [userEmail, setUserEmail] = useState('');
  const [isCollapsed, setIsCollapsed] = useState(false);

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
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans text-gray-900">
      
      {/* 1. SIDEBAR (Red Circle Area) */}
      <aside 
        className={`${
          isCollapsed ? 'w-20' : 'w-64'
        } bg-slate-900 text-slate-300 transition-all duration-300 ease-in-out flex flex-col relative h-full shadow-xl z-50`}
      >
        {/* Toggle Button */}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-10 bg-indigo-600 text-white rounded-full w-6 h-6 flex items-center justify-center shadow-lg hover:bg-indigo-500 z-50 transition-transform active:scale-90"
        >
          {isCollapsed ? '→' : '←'}
        </button>

        {/* Logo Section */}
        <div className={`p-6 mb-2 ${isCollapsed ? 'flex justify-center' : ''}`}>
          <div className="flex items-center space-x-3 text-white">
            <div className="h-9 w-9 min-w-[36px] bg-indigo-600 rounded-xl flex items-center justify-center font-bold shadow-indigo-500/20 shadow-lg">D</div>
            {!isCollapsed && <span className="text-xl font-black tracking-tight whitespace-nowrap">DASHBOARD</span>}
          </div>
        </div>

        {/* Navigation - Added padding bottom (pb-24) so content doesn't hide behind logout */}
        <nav className="flex-1 px-4 space-y-2 overflow-y-auto pb-24 scrollbar-hide">
          <SidebarItem icon="📊" label="Overview" active collapsed={isCollapsed} />
          <SidebarItem icon="👤" label="My Profile" collapsed={isCollapsed} />
          <SidebarItem icon="🛡️" label="Security" collapsed={isCollapsed} />
          <SidebarItem icon="⚙️" label="Settings" collapsed={isCollapsed} />
          <SidebarItem icon="📁" label="Projects" collapsed={isCollapsed} />
          <SidebarItem icon="📈" label="Analytics" collapsed={isCollapsed} />
        </nav>

        {/* 2. LOGOUT BUTTON (Green Circle Area - Fixed to Bottom) */}
        <div className="absolute bottom-0 left-0 w-full bg-slate-900 border-t border-slate-800 p-4">
          <button 
            onClick={handleLogout}
            title="Logout"
            className={`flex items-center justify-center space-x-2 py-3 bg-red-500/10 hover:bg-red-600 text-red-500 hover:text-white rounded-xl text-sm font-bold transition-all duration-200 w-full group overflow-hidden`}
          >
            {/* Icon */}
            <span className="text-lg group-hover:-translate-x-1 transition-transform">
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
            </span>
            {/* Text (Hides when collapsed) */}
            {!isCollapsed && <span className="whitespace-nowrap">Logout</span>}
          </button>
        </div>
      </aside>

      {/* 3. MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-gray-50">
        <div className="flex-1 overflow-y-auto p-8">
          
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                Welcome Back, {userEmail.split('@')[0]}!
              </h1>
              <p className="text-gray-500 text-sm mt-1">Here is a quick overview of your account status.</p>
            </div>
            <div className="h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold border-2 border-white shadow-sm">
              {userEmail.charAt(0).toUpperCase()}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatCard label="Account Status" value="Active" icon="✅" color="text-green-600" />
            <StatCard label="Security Level" value="High" icon="🔒" color="text-blue-600" />
            <StatCard label="Storage Used" value="1.2 GB" icon="☁️" color="text-indigo-600" />
          </div>

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
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// --- Sub-components ---

const SidebarItem = ({ icon, label, active = false, collapsed }) => (
  <button className={`w-full flex items-center ${collapsed ? 'justify-center px-2' : 'space-x-3 px-4'} py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
    active ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30' : 'hover:bg-slate-800 hover:text-white text-slate-400'
  }`}>
    <span className="text-xl min-w-[20px] text-center">{icon}</span>
    {!collapsed && <span className="whitespace-nowrap overflow-hidden transition-all">{label}</span>}
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
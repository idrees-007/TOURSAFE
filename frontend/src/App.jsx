import React, { useState } from 'react';
import Login from './components/Login';
import TouristDashboard from './components/TouristDashboard';
import AdminDashboard from './components/AdminDashboard';
import ReportIssue from './components/ReportIssue';
import InteractiveMap from './components/InteractiveMap';
import EmergencySos from './components/EmergencySos';
import NavigateAttractions from './components/NavigateAttractions';
import SafetyHub from './components/SafetyHub'; // Import the new Safety Hub
import { ArrowLeft, LogOut } from 'lucide-react';

export default function App() {
  const [userRole, setUserRole] = useState(null); 
  const [currentView, setCurrentView] = useState('home'); 

  const handleLogin = (role) => {
    setUserRole(role);
    setCurrentView('home'); 
  };

  const handleLogout = () => {
    setUserRole(null);
    setCurrentView('home');
  };

  if (!userRole) {
    return <Login onLogin={handleLogin} />;
  }

  if (userRole === 'admin') {
    return (
      <div className="relative">
        <button onClick={handleLogout} className="absolute top-6 right-6 z-50 bg-red-500 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg hover:bg-red-600 transition-colors flex items-center gap-2">
          <LogOut size={16} /> Logout Admin
        </button>
        <AdminDashboard />
      </div>
    );
  }

  return (
    <div className="relative">
      
      {currentView === 'home' && (
        <button onClick={handleLogout} className="absolute top-6 right-6 z-50 bg-white/50 backdrop-blur-md border border-slate-200 text-slate-700 px-4 py-2 rounded-xl text-sm font-bold shadow-sm hover:bg-white transition-colors flex items-center gap-2">
          <LogOut size={16} /> Logout
        </button>
      )}

      {currentView !== 'home' && (
        <button 
          onClick={() => setCurrentView('home')} 
          className="absolute top-6 left-6 z-50 bg-white/90 backdrop-blur-xl border border-slate-200 text-slate-800 px-4 py-2.5 rounded-xl text-sm font-black shadow-lg hover:bg-slate-50 transition-all hover:scale-105 flex items-center gap-2"
        >
          <ArrowLeft size={18} /> Back to Dashboard
        </button>
      )}

      {/* Router mapping */}
      {currentView === 'home' && <TouristDashboard onViewChange={setCurrentView} />}
      {currentView === 'emergency' && <EmergencySos />}
      {currentView === 'safety' && <SafetyHub onViewChange={setCurrentView} />} {/* Now opens Safety Hub */}
      {currentView === 'report' && <ReportIssue />} {/* Dedicated report route */}
      {currentView === 'map' && <InteractiveMap />}
      {currentView === 'navigate' && <NavigateAttractions />}
    </div>
  );
}
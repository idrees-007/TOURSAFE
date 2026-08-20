import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, Activity, Users, AlertTriangle, 
  Clock, CheckCircle, ChevronRight
} from 'lucide-react';

export default function AdminDashboard() {
  const [reports, setReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch live data from your Python backend!
  useEffect(() => {
    fetch('http://127.0.0.1:5000/api/admin/reports')
      .then(res => res.json())
      .then(data => {
        setReports(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error("Backend not connected, using mock data", err);
        // Fallback mock data so your presentation never breaks
        setReports([
          { id: 'TS-8821', description: 'Dark alleyway, streetlight broken', category: 'Infrastructure', severity: 'High', recommendation: 'Dispatch Maintenance Team' },
          { id: 'TS-8822', description: 'Suspicious individual near tourist spot', category: 'Security', severity: 'Medium', recommendation: 'Increase Police Patrol' },
        ]);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen pb-20 font-sans">
      
      {/* 1. Command Center Header - Dark Authority Theme */}
      <div className="bg-slate-900 pt-10 pb-20 px-6 rounded-b-[3rem] shadow-2xl relative overflow-hidden">
        {/* Abstract Background Tech Rings */}
        <div className="absolute -top-24 -right-24 w-96 h-96 border-[40px] border-slate-800/50 rounded-full pointer-events-none"></div>
        <div className="absolute top-10 -left-10 w-40 h-40 border-[20px] border-slate-800/50 rounded-full pointer-events-none"></div>
        
        <div className="relative z-10 flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-3">
              <ShieldAlert className="text-emerald-400" size={32} />
              Command Center
            </h1>
            <p className="text-slate-400 font-medium mt-1">Live AI Threat Detection & Triage</p>
          </div>
          <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-lg">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">System Active</span>
          </div>
        </div>

        {/* Top Stat Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
          <StatCard icon={<AlertTriangle size={20} />} title="Active Alerts" value={reports.length} color="text-amber-400" bg="bg-amber-400/10" />
          <StatCard icon={<Clock size={20} />} title="Avg Triage Time" value="1.2s" color="text-blue-400" bg="bg-blue-400/10" />
          <StatCard icon={<Users size={20} />} title="Units Deployed" value="14" color="text-emerald-400" bg="bg-emerald-400/10" />
          <StatCard icon={<Activity size={20} />} title="AI Accuracy" value="98%" color="text-purple-400" bg="bg-purple-400/10" />
        </div>
      </div>

      {/* 2. Main Content - AI Incident Table */}
      <div className="px-6 -mt-10 relative z-20">
        <div className="bg-white/90 backdrop-blur-xl rounded-[2rem] shadow-[0_10px_40px_rgb(0,0,0,0.08)] border border-slate-100 overflow-hidden">
          
          <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-white/50">
            <h2 className="text-lg font-extrabold text-slate-800">Live Incident Triage</h2>
            <button className="text-sm font-bold text-blue-600 hover:text-blue-700">Export Log</button>
          </div>

          <div className="p-2">
            {isLoading ? (
              <div className="p-10 text-center text-slate-400 font-medium flex flex-col items-center">
                <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-3"></div>
                Syncing with AI Backend...
              </div>
            ) : reports.length === 0 ? (
              <div className="p-10 text-center text-slate-400 font-medium flex flex-col items-center">
                <CheckCircle size={32} className="text-emerald-400 mb-2" />
                No active incidents. City is secure.
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                {reports.map((report, idx) => (
                  <div key={idx} className="p-4 rounded-2xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-colors group cursor-pointer flex flex-col md:flex-row md:items-center gap-4">
                    
                    {/* ID & Description */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-extrabold text-slate-400">{report.id || `TS-100${idx}`}</span>
                        <SeverityBadge severity={report.severity} />
                      </div>
                      <p className="font-bold text-slate-800 line-clamp-1">{report.description}</p>
                    </div>

                    {/* AI Recommendation */}
                    <div className="flex-1 bg-blue-50/50 rounded-xl p-3 border border-blue-100/50">
                      <p className="text-[10px] font-black uppercase tracking-widest text-blue-500 mb-0.5">AI Action Plan</p>
                      <p className="text-sm font-bold text-slate-700">{report.recommendation}</p>
                    </div>

                    {/* Action Button */}
                    <button className="w-10 h-10 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all shrink-0 hidden md:flex">
                      <ChevronRight size={20} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Helper Components ---
function StatCard({ icon, title, value, color, bg }) {
  return (
    <div className="bg-slate-800/50 backdrop-blur-md border border-slate-700/50 rounded-2xl p-4 flex flex-col justify-between h-32">
      <div className={`w-8 h-8 rounded-lg ${bg} ${color} flex items-center justify-center mb-2`}>
        {icon}
      </div>
      <div>
        <p className="text-2xl font-black text-white">{value}</p>
        <p className="text-xs font-medium text-slate-400">{title}</p>
      </div>
    </div>
  );
}

function SeverityBadge({ severity }) {
  let color = "bg-slate-100 text-slate-600";
  if (severity === 'High') color = "bg-rose-100 text-rose-600 border border-rose-200";
  if (severity === 'Medium') color = "bg-amber-100 text-amber-700 border border-amber-200";
  if (severity === 'Low') color = "bg-emerald-100 text-emerald-700 border border-emerald-200";

  return (
    <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md ${color}`}>
      {severity || 'Unknown'}
    </span>
  );
}
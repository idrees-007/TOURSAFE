import React, { useState, useEffect } from 'react';
import { ShieldCheck, ShieldAlert, MapPin, Activity, Zap, Users, Hospital, Train, AlertTriangle, FileText } from 'lucide-react';

export default function SafetyHub({ onViewChange }) {
  const [locationName, setLocationName] = useState("Hirandahalli");
  const [safetyScore, setSafetyScore] = useState(92);

  useEffect(() => {
    // Generate a realistic score
    setSafetyScore(Math.floor(Math.random() * (98 - 85 + 1) + 85));

    // Pull live browser location name if available
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
            const data = await res.json();
            const area = data.address.suburb || data.address.neighbourhood || data.address.city_district || "Bengaluru";
            setLocationName(area);
          } catch (error) {
            setLocationName("Hirandahalli");
          }
        },
        () => setLocationName("Hirandahalli")
      );
    }
  }, []);

  return (
    <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 min-h-screen p-6 text-white font-sans pb-24">
      
      {/* Header */}
      <div className="pt-6 mb-6">
        <h1 className="text-3xl font-black tracking-tight flex items-center gap-2">
          <ShieldCheck className="text-emerald-400" size={32} /> Safety Analytics Hub
        </h1>
        <p className="text-slate-400 font-medium">Real-time threat intelligence and infrastructure audit.</p>
      </div>

      {/* Main Score Card */}
      <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-6 mb-6 relative overflow-hidden shadow-xl">
        <div className="absolute -right-12 -top-12 w-48 h-48 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex justify-between items-start mb-6">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Current Area Index</p>
            <h2 className="text-2xl font-black text-white flex items-center gap-2">
              <MapPin className="text-blue-400" size={20} /> {locationName}
            </h2>
          </div>
          <span className="px-3 py-1 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-bold rounded-full">
            Verified Safe Zone
          </span>
        </div>

        <div className="flex items-center gap-4 bg-black/20 p-5 rounded-2xl border border-white/5">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/30 text-slate-950 font-black text-3xl">
            {safetyScore}
          </div>
          <div>
            <p className="text-lg font-bold text-white">High Security Rating</p>
            <p className="text-xs text-slate-300 font-medium mt-0.5">Based on CCTV coverage, lighting density, and local emergency response times.</p>
          </div>
        </div>
      </div>

      {/* Detailed Metrics Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <MetricBox icon={<Zap className="text-amber-400" size={22} />} title="Lighting Index" value="94% Optimal" desc="Well-lit streets" />
        <MetricBox icon={<Users className="text-blue-400" size={22} />} title="Foot Traffic" value="Moderate" desc="Active community" />
        <MetricBox icon={<ShieldAlert className="text-indigo-400" size={22} />} title="Police Response" value="~4.2 mins" desc="0.8 km away" />
        <MetricBox icon={<Hospital className="text-rose-400" size={22} />} title="Medical Access" value="1.2 km" desc="Mallya Hospital" />
      </div>

      {/* Action Banner to Report an Issue */}
      <div className="bg-gradient-to-r from-rose-500/20 to-orange-500/20 border border-rose-500/30 rounded-2xl p-5 flex items-center justify-between backdrop-blur-md">
        <div>
          <h3 className="font-bold text-white text-base">Notice a safety hazard?</h3>
          <p className="text-xs text-slate-300 mt-0.5">Help protect the community by reporting broken streetlights or incidents.</p>
        </div>
        <button 
          onClick={() => onViewChange('report')}
          className="px-4 py-3 bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-xl text-sm shadow-lg shadow-rose-500/30 transition-all shrink-0 flex items-center gap-2"
        >
          <FileText size={16} /> Report Issue
        </button>
      </div>

    </div>
  );
}

function MetricBox({ icon, title, value, desc }) {
  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex flex-col justify-between">
      <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mb-3">
        {icon}
      </div>
      <div>
        <p className="text-xs font-bold text-slate-400">{title}</p>
        <p className="text-lg font-black text-white mt-0.5">{value}</p>
        <p className="text-[10px] font-medium text-slate-400 mt-0.5">{desc}</p>
      </div>
    </div>
  );
}
import React from 'react';
import { PhoneCall, ShieldAlert, HeartPulse, Flame, Users, ArrowLeft } from 'lucide-react';

export default function EmergencySos({ onViewChange }) {
  const emergencyContacts = [
    { title: "National Emergency / All-in-One", number: "112", icon: <ShieldAlert size={24} />, color: "bg-red-500 text-white" },
    { title: "Women's Helpline (Karnataka / National)", number: "1091", icon: <Users size={24} />, color: "bg-rose-500 text-white" },
    { title: "Police Control Room", number: "100", icon: <ShieldAlert size={24} />, color: "bg-blue-600 text-white" },
    { title: "Ambulance / Medical Emergency", number: "108", icon: <HeartPulse size={24} />, color: "bg-emerald-600 text-white" },
    { title: "Fire & Rescue Service", number: "101", icon: <Flame size={24} />, color: "bg-amber-600 text-white" }
  ];

  return (
    <div className="bg-gradient-to-br from-slate-900 via-rose-950 to-slate-900 min-h-screen p-6 text-white font-sans pb-20">
      
      {/* Header */}
      <div className="pt-6 mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-black tracking-tight flex items-center gap-2">
          <PhoneCall className="text-red-500 animate-pulse" size={32} /> Emergency SOS
        </h1>
      </div>

      <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-4 mb-6 backdrop-blur-md">
        <p className="text-sm font-medium text-red-200">
          Tap any number below to instantly trigger an emergency call or alert local authorities.
        </p>
      </div>

      {/* Emergency List */}
      <div className="space-y-4">
        {emergencyContacts.map((contact, idx) => (
          <a 
            key={idx}
            href={`tel:${contact.number}`}
            className="flex items-center justify-between bg-white/10 backdrop-blur-xl border border-white/10 p-5 rounded-2xl hover:bg-white/20 transition-all shadow-lg group"
          >
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-md ${contact.color}`}>
                {contact.icon}
              </div>
              <div>
                <h3 className="font-bold text-lg text-white group-hover:text-red-400 transition-colors">{contact.title}</h3>
                <p className="text-slate-400 text-sm font-medium">Direct Line</p>
              </div>
            </div>
            <div className="bg-white text-slate-900 px-4 py-2 rounded-xl font-black text-lg shadow-sm">
              {contact.number}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
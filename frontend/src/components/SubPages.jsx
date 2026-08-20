import React from 'react';
import { Phone, MapPin, ShieldCheck, AlertTriangle, Navigation, Hospital, ShieldAlert } from 'lucide-react';

const attractions = [
  { id: 1, name: "Bengaluru Palace", distance: "2.4 km", rating: 4.8 },
  { id: 2, name: "Cubbon Park", distance: "1.1 km", rating: 4.7 },
  { id: 3, name: "Lalbagh Botanical Garden", distance: "4.5 km", rating: 4.9 },
  { id: 4, name: "Vidhana Soudha", distance: "1.8 km", rating: 4.6 },
  { id: 5, name: "Commercial Street", distance: "3.2 km", rating: 4.5 }
];

export function NavigatePage() {
  const openGoogleMaps = (placeName) => {
    const query = encodeURIComponent(`${placeName}, Bengaluru`);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Navigate Attractions</h2>
      <div className="grid gap-4">
        {attractions.map(place => (
          <div key={place.id} onClick={() => openGoogleMaps(place.name)} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex justify-between items-center cursor-pointer hover:bg-blue-50 transition">
            <div>
              <h3 className="font-bold text-lg text-slate-800">{place.name}</h3>
              <p className="text-sm text-slate-500">{place.distance} away • ⭐ {place.rating}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full text-blue-600 shadow-sm">
              <Navigation size={20} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function EmergencyPage() {
  const contacts = [
    { name: "National Emergency", number: "112", icon: <AlertTriangle /> },
    { name: "Police", number: "100", icon: <ShieldAlert /> },
    { name: "Ambulance", number: "108", icon: <Hospital /> },
    { name: "Women's Helpline", number: "1091", icon: <Phone /> },
    { name: "Tourist Police", number: "1363", icon: <ShieldCheck /> }
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-red-600 mb-6 flex items-center gap-2">
        <AlertTriangle /> Emergency Assistance
      </h2>
      <div className="grid gap-4">
        {contacts.map(c => (
          <a key={c.name} href={`tel:${c.number}`} className="bg-white p-4 rounded-2xl shadow-sm border border-red-100 flex justify-between items-center hover:bg-red-50 transition">
            <div className="flex items-center gap-4">
              <div className="bg-red-100 p-3 rounded-full text-red-600">{c.icon}</div>
              <div>
                <h3 className="font-bold text-lg text-slate-800">{c.name}</h3>
                <p className="text-sm text-slate-500">Tap to call instantly</p>
              </div>
            </div>
            <span className="font-bold text-xl text-slate-800">{c.number}</span>
          </a>
        ))}
      </div>
    </div>
  );
}

export function SafetyPage() {
  return (
    <div className="p-6 bg-gray-50 min-h-screen max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Location Safety Data</h2>
      
      <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-lg mb-6 relative overflow-hidden">
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-indigo-500 rounded-full blur-3xl opacity-20"></div>
        <h3 className="text-sm text-slate-400 uppercase tracking-wider mb-2 relative z-10">You are currently in</h3>
        <div className="flex items-center gap-2 text-xl font-bold mb-6 relative z-10">
          <MapPin className="text-blue-400" />
          Hirandahalli, Bengaluru
        </div>
        
        <div className="flex justify-between items-end border-t border-slate-700 pt-6 relative z-10">
          <div>
            <p className="text-sm text-slate-400 mb-1">Live Safety Score</p>
            <div className="text-4xl font-bold text-green-400">88<span className="text-lg text-slate-500 font-normal">/100</span></div>
          </div>
          <ShieldCheck size={48} className="text-green-400/30" />
        </div>
      </div>

      <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 mb-4">
        <h3 className="font-bold text-slate-800 mb-3">Area Insights</h3>
        <ul className="space-y-4 text-sm text-slate-600">
          <li className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-green-500 flex-shrink-0"></span> 
            Generally safe for walking during the day.
          </li>
          <li className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500 flex-shrink-0"></span> 
            Moderate traffic congestion currently active.
          </li>
          <li className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-green-500 flex-shrink-0"></span> 
            Nearest police station is 1.5km away.
          </li>
        </ul>
      </div>
    </div>
  );
}
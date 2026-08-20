import React, { useState, useEffect } from 'react';
import { 
  Search, Map, Navigation, PhoneCall, ShieldAlert, 
  Star, MapPin, ShieldCheck, Bell, Train, Hospital, Sparkles
} from 'lucide-react';

// --- MOCK DATA ---
const attractions = [
  { id: 1, name: "Bengaluru Palace", image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f0a?auto=format&fit=crop&q=80&w=800", rating: 4.8, distance: "2.4 km", safetyScore: 95, nearby: ['police', 'hospital', 'metro'] },
  { id: 2, name: "Cubbon Park", image: "https://images.unsplash.com/photo-1620766165457-a80757bf53cb?auto=format&fit=crop&q=80&w=800", rating: 4.7, distance: "1.1 km", safetyScore: 88, nearby: ['metro', 'police'] },
  { id: 3, name: "Lalbagh Botanical Garden", image: "/lalbagh.jpg", rating: 4.9, distance: "4.5 km", safetyScore: 92, nearby: ['hospital', 'metro'] }
];

export default function TouristDashboard({ onViewChange }) {
  const [locationName, setLocationName] = useState("Detecting location...");
  const [safetyScore, setSafetyScore] = useState("--");
  const [searchQuery, setSearchQuery] = useState("");

  // Location and Safety Score Simulation
  useEffect(() => {
    setSafetyScore(Math.floor(Math.random() * (98 - 85 + 1) + 85));

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
    } else {
      setLocationName("Hirandahalli");
    }
  }, []);

  const openGoogleMaps = (placeName) => {
    const query = encodeURIComponent(`${placeName}, Bengaluru`);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  };

  // --- SEARCH FILTER LOGIC ---
  const filteredAttractions = attractions.filter(place => {
    if (!searchQuery.trim()) return true;
    
    const query = searchQuery.toLowerCase().trim();
    const nameMatch = place.name.toLowerCase().includes(query);
    const tagMatch = place.nearby.some(tag => tag.toLowerCase().includes(query));
    
    return nameMatch || tagMatch;
  });

  return (
    <div className="bg-gradient-to-br from-slate-50 via-orange-50/30 to-blue-50/40 min-h-screen pb-20 relative">
      
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-blue-100/50 to-transparent pointer-events-none"></div>
      <div className="absolute top-20 right-0 w-64 h-64 bg-orange-200/20 rounded-full blur-3xl pointer-events-none"></div>

      {/* 1. Header Section */}
      <div className="px-6 pt-12 pb-8 bg-white/60 backdrop-blur-2xl rounded-b-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-b border-white relative z-10">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-600 tracking-tight">
              TourSafe
            </h1>
            <p className="text-slate-500 font-medium mt-1 flex items-center gap-1">
              <Sparkles size={14} className="text-orange-400" /> Explore with confidence.
            </p>
          </div>
          <button className="relative p-3 bg-white rounded-2xl shadow-sm border border-slate-100 hover:scale-105 transition-transform">
            <Bell className="text-slate-700" size={22} />
            <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
        </div>

        {/* Search Input */}
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-blue-600">
            <Search className="text-slate-400 group-focus-within:text-blue-500 transition-colors" size={20} />
          </div>
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search 'Palace', 'metro', 'park'..." 
            className="w-full pl-12 pr-4 py-4.5 bg-white shadow-[0_4px_20px_rgb(0,0,0,0.05)] border border-slate-100 rounded-2xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all font-medium"
          />
        </div>
      </div>

      {/* 2. Quick Actions */}
      <div className="px-6 py-8 relative z-10">
        <div className="flex justify-between items-center">
          <QuickActionButton icon={<Map size={24} />} label="Live Map" gradient="from-blue-400 to-blue-600" shadow="shadow-blue-500/20" onClick={() => onViewChange('map')} />
          <QuickActionButton icon={<Navigation size={24} />} label="Navigate" gradient="from-emerald-400 to-emerald-600" shadow="shadow-emerald-500/20" onClick={() => onViewChange('navigate')} />
          <QuickActionButton icon={<ShieldCheck size={24} />} label="Safety" gradient="from-indigo-400 to-indigo-600" shadow="shadow-indigo-500/20" onClick={() => onViewChange('safety')} />
          <QuickActionButton icon={<PhoneCall size={24} />} label="SOS" gradient="from-red-400 to-rose-600" shadow="shadow-red-500/20" onClick={() => onViewChange('emergency')} />
        </div>
      </div>

      {/* 3. Safety Snapshot */}
      <div className="px-6 mb-10 relative z-10">
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 rounded-[2rem] p-6 text-white shadow-xl shadow-slate-900/10 relative overflow-hidden border border-slate-700/50">
          <div className="absolute -right-10 -top-10 w-48 h-48 bg-blue-500/30 rounded-full blur-3xl"></div>
          <div className="absolute -left-10 -bottom-10 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl"></div>
          
          <div className="flex justify-between items-start relative z-10">
            <div>
              <h2 className="text-xs font-bold text-blue-300 uppercase tracking-widest mb-1">Live Area Safety</h2>
              <div className="flex items-center gap-2 mt-1">
                <ShieldCheck className="text-green-400 drop-shadow-[0_0_8px_rgba(74,222,128,0.5)]" size={32} />
                <span className="text-4xl font-extrabold tracking-tight">{safetyScore}<span className="text-xl text-slate-400 font-medium">/100</span></span>
              </div>
              <p className="text-sm text-slate-300 mt-3 flex items-center gap-1.5 font-medium bg-white/5 inline-flex px-3 py-1.5 rounded-lg border border-white/10">
                <MapPin size={14} className="text-blue-400"/> {locationName}
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md px-4 py-3 rounded-2xl text-center border border-white/10 shadow-lg">
              <ShieldAlert className="mx-auto text-amber-400 mb-1" size={24} />
              <span className="text-xs font-bold text-white tracking-wide">1 ALERT</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Popular Attractions */}
      <div className="mb-6 relative z-10">
        <div className="px-6 flex justify-between items-center mb-5">
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Verified Destinations</h2>
          <button className="text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors">See All</button>
        </div>
        
        {filteredAttractions.length === 0 ? (
          <div className="px-6 text-center py-8">
            <p className="text-slate-500 font-medium bg-white/50 backdrop-blur-sm p-4 rounded-2xl border border-slate-100">
              No safe zones found matching "<span className="text-slate-900 font-bold">{searchQuery}</span>"
            </p>
          </div>
        ) : (
          <div className="flex overflow-x-auto hide-scrollbar gap-5 px-6 pb-6 snap-x">
            {filteredAttractions.map((place) => (
              <div 
                key={place.id} 
                onClick={() => openGoogleMaps(place.name)} 
                className="min-w-[280px] bg-white rounded-[2rem] p-3 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-100/50 snap-center shrink-0 cursor-pointer hover:-translate-y-1 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-300"
              >
                <div className="relative h-48 rounded-[1.5rem] overflow-hidden mb-4 group">
                  <img src={place.image} alt={place.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>
                  
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1.5 rounded-xl flex items-center gap-1.5 shadow-sm">
                    <Star size={14} className="text-amber-500 fill-amber-500" />
                    <span className="text-xs font-extrabold text-slate-800">{place.rating}</span>
                  </div>
                  <div className="absolute top-3 right-3 bg-emerald-500/90 backdrop-blur-md px-2.5 py-1.5 rounded-xl flex items-center gap-1.5 shadow-sm text-white">
                    <ShieldCheck size={14} />
                    <span className="text-xs font-extrabold">{place.safetyScore} Safe</span>
                  </div>
                </div>
                
                <div className="px-2 pb-1">
                  <h3 className="font-bold text-lg text-slate-900 truncate">{place.name}</h3>
                  <div className="flex items-center text-slate-500 text-sm mt-1 mb-4 font-medium">
                    <MapPin size={16} className="mr-1 text-slate-400" />
                    <span>{place.distance} away</span>
                  </div>
                  
                  <div className="flex gap-2">
                    {place.nearby.includes('police') && <div className="p-2 bg-blue-50 rounded-xl text-blue-600" title="Police"><ShieldAlert size={16} /></div>}
                    {place.nearby.includes('hospital') && <div className="p-2 bg-rose-50 rounded-xl text-rose-500" title="Hospital"><Hospital size={16} /></div>}
                    {place.nearby.includes('metro') && <div className="p-2 bg-emerald-50 rounded-xl text-emerald-600" title="Metro"><Train size={16} /></div>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// --- HELPER COMPONENTS ---
function QuickActionButton({ icon, label, gradient, shadow, onClick }) {
  return (
    <div className="flex flex-col items-center gap-2.5 group cursor-pointer" onClick={onClick}>
      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white bg-gradient-to-br ${gradient} shadow-lg ${shadow} group-hover:scale-105 group-hover:-translate-y-1 transition-all duration-300`}>
        {icon}
      </div>
      <span className="text-sm font-bold text-slate-700">{label}</span>
    </div>
  );
}
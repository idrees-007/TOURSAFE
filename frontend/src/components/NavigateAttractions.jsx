import React from 'react';
import { Navigation, MapPin, Star, ShieldCheck, ExternalLink } from 'lucide-react';

const attractions = [
  { id: 1, name: "Bengaluru Palace", image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f0a?auto=format&fit=crop&q=80&w=800", rating: 4.8, distance: "2.4 km", safetyScore: 95 },
  { id: 2, name: "Cubbon Park", image: "https://images.unsplash.com/photo-1620766165457-a80757bf53cb?auto=format&fit=crop&q=80&w=800", rating: 4.7, distance: "1.1 km", safetyScore: 88 },
  { id: 3, name: "Lalbagh Botanical Garden", image: "/lalbagh.jpg", rating: 4.9, distance: "4.5 km", safetyScore: 92 }
];

export default function NavigateAttractions() {
  const openGoogleMaps = (placeName) => {
    const query = encodeURIComponent(`${placeName}, Bengaluru`);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  };

  return (
    <div className="bg-slate-50 min-h-screen p-6 font-sans pb-20">
      <div className="pt-6 mb-6">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
          <Navigation className="text-emerald-600" size={32} /> Navigation Hub
        </h1>
        <p className="text-slate-500 font-medium">Select a destination to open turn-by-turn routes.</p>
      </div>

      <div className="space-y-4">
        {attractions.map((place) => (
          <div 
            key={place.id}
            onClick={() => openGoogleMaps(place.name)}
            className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex items-center gap-4 cursor-pointer hover:shadow-md transition-all group"
          >
            <img src={place.image} alt={place.name} className="w-20 h-20 rounded-xl object-cover shrink-0" />
            
            <div className="flex-1">
              <h3 className="font-bold text-slate-900 text-lg group-hover:text-blue-600 transition-colors">{place.name}</h3>
              <div className="flex items-center text-slate-500 text-sm gap-3 mt-1">
                <span className="flex items-center gap-1"><MapPin size={14} /> {place.distance}</span>
                <span className="flex items-center gap-1 text-amber-500"><Star size={14} className="fill-amber-500" /> {place.rating}</span>
              </div>
            </div>

            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <ExternalLink size={20} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
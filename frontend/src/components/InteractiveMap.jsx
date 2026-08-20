import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Map as MapIcon, Filter } from 'lucide-react';
import L from 'leaflet';

// Fix for default marker icons missing in react-leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
});
L.Marker.prototype.options.icon = DefaultIcon;

// Bengaluru Coordinates Center
const BENGALURU_CENTER = [12.9716, 77.5946];

// Mock Map Data points
const mapLocations = [
  { id: 1, name: "Bengaluru Palace", lat: 12.9988, lng: 77.5920, type: "Attraction", desc: "Historic royal palace and grounds.", color: "text-blue-600 bg-blue-50" },
  { id: 2, name: "Cubbon Park", lat: 12.9756, lng: 77.5937, type: "Attraction", desc: "Major park in the heart of the city.", color: "text-blue-600 bg-blue-50" },
  { id: 3, name: "Central Police Station", lat: 12.9760, lng: 77.5850, type: "Emergency", desc: "24/7 City Police Headquarters.", color: "text-rose-600 bg-rose-50" },
  { id: 4, name: "Mallya Hospital", lat: 12.9700, lng: 77.5960, type: "Emergency", desc: "Multi-specialty emergency healthcare.", color: "text-rose-600 bg-rose-50" },
  { id: 5, name: "MG Road Metro Station", lat: 12.9750, lng: 77.6060, type: "Transport", desc: "Primary transit and metro hub.", color: "text-emerald-600 bg-emerald-50" },
  { id: 6, name: "Reported Streetlight Issue", lat: 12.9800, lng: 77.5900, type: "Report", desc: "Ticket TS-2026-9912: Poor lighting reported.", color: "text-amber-600 bg-amber-50" }
];

export default function InteractiveMap() {
  const [filter, setFilter] = useState('All');

  const filteredLocations = mapLocations.filter(loc => {
    if (filter === 'All') return true;
    return loc.type === filter;
  });

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-slate-50 relative">
      
      {/* Premium Glassmorphic Header & Filter Bar */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] pt-6 pb-4 px-6 relative z-10 flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-blue-100 text-blue-600 rounded-xl shadow-sm">
            <MapIcon size={20} />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Live City Map</h1>
        </div>

        <div className="flex items-center gap-3 overflow-x-auto hide-scrollbar pb-1">
          <Filter size={16} className="text-slate-400 shrink-0 mr-1" />
          <FilterButton label="All" active={filter === 'All'} onClick={() => setFilter('All')} />
          <FilterButton label="Attraction" active={filter === 'Attraction'} onClick={() => setFilter('Attraction')} />
          <FilterButton label="Emergency" active={filter === 'Emergency'} onClick={() => setFilter('Emergency')} />
          <FilterButton label="Transport" active={filter === 'Transport'} onClick={() => setFilter('Transport')} />
          <FilterButton label="Report" active={filter === 'Report'} onClick={() => setFilter('Report')} />
        </div>
      </div>

      {/* Leaflet Map Canvas Container */}
      {/* z-0 ensures the map controls don't overlap your app's top navigation bar */}
      <div className="flex-1 w-full relative z-0">
        <MapContainer 
          center={BENGALURU_CENTER} 
          zoom={13} 
          style={{ width: '100%', height: '100%' }}
          zoomControl={false} // Disable default zoom to make it look cleaner
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" // Using a cleaner, more modern map tile style
          />

          {filteredLocations.map(loc => (
            <Marker key={loc.id} position={[loc.lat, loc.lng]}>
              <Popup className="rounded-2xl overflow-hidden shadow-xl border-0">
                <div className="font-sans">
                  <span className={`text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-lg inline-block mb-2 ${loc.color}`}>
                    {loc.type}
                  </span>
                  <h3 className="font-extrabold text-slate-900 text-base leading-tight mb-1.5">{loc.name}</h3>
                  <p className="text-xs text-slate-500 font-medium">{loc.desc}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}

function FilterButton({ label, active, onClick }) {
  return (
    <button 
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 whitespace-nowrap shrink-0 shadow-sm border ${
        active 
          ? 'bg-slate-900 text-white border-slate-900 shadow-slate-900/20 scale-105' 
          : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
      }`}
    >
      {label}
    </button>
  );
}
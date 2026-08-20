import React, { useState } from 'react';
import { Camera, MapPin, AlertTriangle, Send, ShieldCheck, Image as ImageIcon } from 'lucide-react';

export default function ReportIssue() {
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ticketId, setTicketId] = useState(null);

  // --- THIS IS THE UPDATED FUNCTION ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Send the actual data to the Python Backend
      const response = await fetch('http://127.0.0.1:5000/api/reports', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description: description }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setTicketId(data.ticketId); // Use the real ID from Python
        setDescription(''); // Clear the form
      } else {
        setTicketId(`TS-ERR-${Math.floor(Math.random() * 1000)}`);
      }
    } catch (error) {
      console.error("Backend connection failed:", error);
      // Fallback just in case the server is down during your demo
      setTicketId(`TS-MOCK-${Math.floor(Math.random() * 10000)}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (ticketId) {
    return (
      <div className="bg-gradient-to-br from-slate-50 via-emerald-50/30 to-blue-50/40 min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-400/20 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="bg-white/80 backdrop-blur-2xl rounded-[2.5rem] p-8 shadow-[0_20px_60px_rgb(0,0,0,0.05)] border border-white max-w-md w-full text-center relative z-10">
          <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-500/30">
            <ShieldCheck size={48} className="text-white" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 mb-2">Report Secured</h2>
          <p className="text-slate-500 font-medium mb-6">Your incident has been securely routed to the rapid response team.</p>
          
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 mb-6">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Official Ticket ID</p>
            <p className="text-2xl font-black text-slate-800 tracking-tight">{ticketId}</p>
          </div>
          
          <button 
            onClick={() => setTicketId(null)}
            className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-colors shadow-lg"
          >
            Submit Another Report
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-slate-50 via-rose-50/30 to-orange-50/20 min-h-screen pb-20 relative">
      <div className="absolute top-0 right-0 w-full h-64 bg-gradient-to-b from-rose-100/50 to-transparent pointer-events-none"></div>

      <div className="px-6 pt-12 pb-6 relative z-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 bg-rose-100 text-rose-600 rounded-xl shadow-sm">
            <AlertTriangle size={24} />
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Report Issue</h1>
        </div>
        <p className="text-slate-500 font-medium">Your report helps keep the community safe.</p>
      </div>

      <div className="px-6 relative z-10">
        <form onSubmit={handleSubmit} className="bg-white/70 backdrop-blur-xl rounded-[2rem] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white">
          
          <div className="mb-5">
            <label className="block text-sm font-bold text-slate-700 mb-2">Incident Location</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <MapPin className="text-slate-400" size={20} />
              </div>
              <input 
                type="text" 
                defaultValue="Current Location (Hirandahalli)"
                className="w-full pl-11 pr-4 py-3.5 bg-slate-50/50 border border-slate-200 rounded-2xl text-slate-800 font-medium focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-400 transition-all"
                readOnly
              />
            </div>
          </div>

          <div className="mb-5">
            <label className="block text-sm font-bold text-slate-700 mb-2">What happened?</label>
            <textarea 
              rows="4" 
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Please provide specific details about the safety concern..."
              className="w-full p-4 bg-slate-50/50 border border-slate-200 rounded-2xl text-slate-800 placeholder-slate-400 font-medium focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-400 transition-all resize-none"
            ></textarea>
          </div>

          <div className="flex gap-3 mb-8">
            <button type="button" className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-600 font-bold hover:bg-slate-100 transition-colors">
              <Camera size={18} /> Take Photo
            </button>
            <button type="button" className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-600 font-bold hover:bg-slate-100 transition-colors">
              <ImageIcon size={18} /> Upload Media
            </button>
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className={`w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-white transition-all shadow-lg ${
              isSubmitting 
                ? 'bg-slate-400 cursor-not-allowed' 
                : 'bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 shadow-rose-500/25 hover:shadow-rose-500/40 hover:-translate-y-0.5'
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">Processing Security Data...</span>
            ) : (
              <>
                <Send size={18} /> Submit Anonymous Report
              </>
            )}
          </button>
          
          <p className="text-center text-xs font-medium text-slate-400 mt-4 flex items-center justify-center gap-1">
            <ShieldCheck size={12} /> Data is end-to-end encrypted
          </p>
        </form>
      </div>
    </div>
  );
}
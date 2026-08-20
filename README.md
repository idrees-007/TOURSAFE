# 🛡️ TourSafe: A Safe City For Every Woman

> A full-stack civic safety and intelligence platform designed to empower civilians with real-time threat analytics, verified safe zones, and an instant emergency response pipeline, paired with an administrative Command Center.

![Project Banner](https://images.unsplash.com/photo-1596422846543-75c6fc197f0a?auto=format&fit=crop&q=80&w=1200)

---

## 🚀 About The Project

**TourSafe** is engineered to bridge the gap between civilians and municipal emergency infrastructure. Whether navigating a new city or reporting infrastructural hazards (like broken streetlights or dark zones), TourSafe provides an intuitive, glassmorphic interface built for speed, safety, and reliability.

The application features a **Dual-Portal Architecture**:
1. **Civilian / Tourist Portal:** Live geolocation tracking, area safety indexing, keyword-filtered verified destinations, emergency SOS directories, and interactive mapping.
2. **Command Center (Admin):** A dark-mode municipal operations dashboard equipped with automated AI triage and live incident management.

---

## 🛠️ Tech Stack

* **Frontend:** React, Vite, Tailwind CSS, Lucide Icons
* **Mapping & Location:** OpenStreetMap API, Leaflet / Nominatim Reverse Geocoding
* **Backend:** Python, Flask (API & Data Triage)
* **Authentication:** Role-Based Access Control (RBAC) with simulated OAuth / Secure Credentials

---

## ✨ Key Features

* **🔐 Dual-Role Authentication:** Sleek portal supporting Google-styled civilian sign-in and secure administrative credentials for municipal command.
* **📍 Live Geolocation & Safety Indexing:** Automatically detects the user's current neighborhood (e.g., Bengaluru sectors) and calculates a real-time safety score (out of 100) based on lighting density, police proximity, and emergency response times.
* **🔍 Instant Smart Search Bar:** Filter verified destinations dynamically by name (e.g., *"Palace"*) or infrastructure tags (e.g., *"metro"*, *"hospital"*, *"police"*).
* **🚨 Emergency SOS Directory:** One-tap direct dial for national emergency lines (112), women's helplines (1091), police control rooms, and medical services.
* **🧭 Navigation Hub:** Direct integration with turn-by-turn routing to high-safety tourist zones and landmarks.
* **📊 Command Center Triage:** Real-time data feed for city administrators to track, filter, and resolve civilian safety reports.

---

## 📸 Screenshots & Workflow

### 1. Secure Authentication & Role Toggle
*Civilians can authenticate seamlessly, while city administrators access the Command Center via secure credentials.*

### 2. Tourist Dashboard & Live Safety Score
*Displays real-time area ratings, verified destination cards, and quick-action utility triggers (Live Map, Navigate, Safety, SOS).*

---

## 💻 Getting Started Locally

To run this project on your local machine, follow these steps:

### Prerequisites
* Node.js & npm installed
* Python installed (for the backend server)

### Installation

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/your-username/toursafe.git](https://github.com/your-username/toursafe.git)
   cd toursafe
from flask import Flask, request, jsonify
from flask_cors import CORS
import random

app = Flask(__name__)
# Enable CORS so your React app on port 5173 can talk to Flask on port 5000
CORS(app)

# In-memory database for the hackathon demo
reports_db = [
    { 
        "id": "TS-8821", 
        "description": "Dark alleyway, streetlight broken near the metro station.", 
        "category": "Infrastructure", 
        "severity": "Medium", 
        "recommendation": "Dispatch Maintenance Team" 
    },
    { 
        "id": "TS-8822", 
        "description": "Suspicious individual loitering near the tourist spot.", 
        "category": "Security", 
        "severity": "High", 
        "recommendation": "Increase Police Patrol" 
    }
]

# --- MOCK AI TRIAGE ENGINE ---
def analyze_report(description):
    """
    Simulates an AI processing the text to determine severity and action.
    """
    text = description.lower()
    
    if any(word in text for word in ["gun", "knife", "attack", "assault", "kidnap"]):
        return "Security", "Critical", "Dispatch Armed Police Unit & Ambulance"
    
    elif any(word in text for word in ["follow", "harass", "scared", "suspicious", "stalking"]):
        return "Security", "High", "Dispatch Nearest Police Patrol"
        
    elif any(word in text for word in ["medical", "accident", "bleeding", "unconscious", "hurt"]):
        return "Medical", "High", "Dispatch Ambulance (108)"
        
    elif any(word in text for word in ["dark", "light", "streetlight", "pothole", "broken"]):
        return "Infrastructure", "Medium", "Log for City Maintenance Team"
        
    else:
        return "General", "Low", "Monitor Area via CCTV"

# --- API ROUTES ---

@app.route('/api/reports', methods=['POST'])
def create_report():
    data = request.get_json()
    description = data.get('description', '')
    
    # Run the report through our "AI"
    category, severity, recommendation = analyze_report(description)
    
    # Generate a random ticket ID
    ticket_id = f"TS-{random.randint(1000, 9999)}"
    
    new_report = {
        "id": ticket_id,
        "description": description,
        "category": category,
        "severity": severity,
        "recommendation": recommendation
    }
    
    # Add to our database at the front of the list (so it shows up first)
    reports_db.insert(0, new_report)
    
    return jsonify({
        "status": "success", 
        "ticketId": ticket_id,
        "ai_analysis": {
            "severity": severity,
            "category": category
        }
    }), 201

@app.route('/api/admin/reports', methods=['GET'])
def get_reports():
    return jsonify(reports_db), 200

if __name__ == '__main__':
    print("🚀 TourSafe AI Backend starting on http://127.0.0.1:5000")
    app.run(debug=True, port=5000)
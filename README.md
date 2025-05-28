# 🚨 CrisisConnect - Crowed Sourced Disaster Management Application

CrisisConnect built using **React**, **Map APIs**, and **backend integration** to provide real-time alerts during disasters and ensure safety. The app visualizes live disaster data, routes to safety, and notifies nearby authorities or guardians.

---

🌟 Features

🔥 Disaster Alert System

Live visualization of natural disasters (earthquakes, floods, wildfires, etc.) on a map interface using Ambee API.

Fetches latest data country-wise using by-country-code endpoint.

Manual data refresh to conserve API usage.

🧭 Safe Route Mapping

Suggests the safest routes during emergencies using Mapbox or Google Maps API.

Real-time navigation and danger zone avoidance.

☁️ Weather Updates

Integration with WeatherAPI to show weather conditions that might affect safety.

Simple weather dashboard with live updates.

💬 Chatbot Support

AI-powered chatbot assistant to answer emergency-related queries.

Guide users through safety protocols and features.

📱 UI Overview

🔘 Home Page

Dashboard with cards: Disaster Map, Weather, Safety Button, Chatbot.

Clean UI with Tailwind CSS and icons for better UX.

🗺️ Disaster Map

Fullscreen map with disaster markers (type, time, location).

Toggle for disaster type (fire, flood, etc.).

🚶 Safe Route

Form to input destination.

Displays safest path and highlights danger zones.

🤖 Chatbot

Popup chat with AI assistant for help and FAQs.

---

## 🔧 Tech Stack

* **Frontend**: React, Tailwind CSS, Lucide Icons
* **Backend**: Node.js/Express (for alerts and authentication)
* **APIs Used**:

  * Ambee Natural Disasters API
  * WeatherAPI
  * Mapbox/Google Maps

---

## 🚀 Installation & Run Locally

```bash
# Clone the repository
git clone https://github.com/yourusername/emergency-alert-app.git

# Navigate to project directory
cd emergency-alert-app

# Install dependencies
npm install

# Run the app
npm start
```

---

## 📂 Project Structure

```
📦 emergency-alert-app
├── 📁 src
│   ├── 📁 components
│   ├── 📁 pages
│   ├── 📁 api
│   ├── 📁 assets
│   └── App.jsx
├── 📄 tailwind.config.js
├── 📄 package.json
└── 📄 README.md
```

---

## ✨ Team & Credits

Developed by a passionate team of Computer Science final-year students as a capstone project for real-world impact.

* Mageshkannan U
* Madhan kumar K
* Jashwanth E M
* Arun J

---

## 📜 License

This project is licensed under the MIT License - see the LICENSE.md file for details.

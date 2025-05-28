import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaCloudSun,
  FaRobot,
  FaSyncAlt,
  FaChartLine,
  FaMapMarkerAlt,
  FaExclamationTriangle,
  FaUtensils,
  FaPhone,
} from "react-icons/fa";
import { useLocationContext } from "../Context/LocationContext";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const iconMap = {
  TN: {
    html: '<div style="font-size: 24px; color: #00CED1;">🌊</div>',
    name: "Tsunami",
  },
  EQ: {
    html: '<div style="font-size: 24px; color: #8B4513;">🌍</div>',
    name: "Earthquake",
  },
  TC: {
    html: '<div style="font-size: 24px; color: #4682B4;">🌪️</div>',
    name: "Tropical Cyclone",
  },
  WF: {
    html: '<div style="font-size: 24px; color: #FF4500;">🔥</div>',
    name: "Wildfire",
  },
  FL: {
    html: '<div style="font-size: 24px; color: #1E90FF;">💧</div>',
    name: "Flood",
  },
  ET: {
    html: '<div style="font-size: 24px; color: #FFA500;">☀️</div>',
    name: "Extreme Temperature",
  },
  DR: {
    html: '<div style="font-size: 24px; color: #DAA520;">🏜️</div>',
    name: "Drought",
  },
  SW: {
    html: '<div style="font-size: 24px; color: #FFD700;">⚡</div>',
    name: "Severe Storm",
  },
  SI: {
    html: '<div style="font-size: 24px; color: #ADD8E6;">❄️</div>',
    name: "Sea Ice",
  },
  VO: {
    html: '<div style="font-size: 24px; color: #A52A2A;">🌋</div>',
    name: "Volcano",
  },
  LS: {
    html: '<div style="font-size: 24px; color: #6B8E23;">⛰️</div>',
    name: "Landslide",
  },
  Misc: {
    html: '<div style="font-size: 24px; color: #808080;">❓</div>',
    name: "Miscellaneous",
  },
  default: {
    html: '<div style="font-size: 24px; color: #FF0000;">⚠️</div>',
    name: "Unknown",
  },
};

const getDisasterIcon = (eventType) =>
  L.divIcon({
    className: "custom-disaster-icon",
    html: iconMap[eventType]?.html || iconMap.default.html,
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
  });

const Home = () => {
  const { location, setLocation } = useLocationContext();
  const navigate = useNavigate();
  const [weather, setWeather] = useState("Loading...");
  const [username, setUsername] = useState("Guest");
  const [isBotOpen, setIsBotOpen] = useState(false);
  const [disasters, setDisasters] = useState([]);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const isSignedUp = localStorage.getItem("isSignedUp");
    const storedName = localStorage.getItem("name");
    if (isSignedUp === "true" && storedName) setUsername(storedName);
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude: lat, longitude: lon } = position.coords;
          setLocation({ lat: lat.toFixed(2), lon: lon.toFixed(2) });
          await fetchWeather(lat, lon);
        },
        (error) => {
          console.error("Geolocation error:", error);
          setLocation({ lat: null, lon: null });
        }
      );
    }
  }, []);

  const fetchWeather = async (lat, lon) => {
    try {
      const API_KEY = import.meta.env.VITE_WEATHER_API;
      const res = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${lat},${lon}`
      );
      const data = await res.json();
      setWeather(`${data.current.condition.text}, ${data.current.temp_c}°C`);
    } catch {
      setWeather("Failed to load weather");
    }
  };

  const fetchDisasterData = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/disasters");
      const data = await res.json();
      setDisasters(Array.isArray(data) ? data : data.data || []);
    } catch {
      setDisasters([]);
    }
  };

  useEffect(() => {
    fetchDisasterData();
  }, []);

  const toggleBot = () => setIsBotOpen((prev) => !prev);
  const handleEmergencyClick = () => {
    if (window.innerWidth <= 768) {
      window.location.href = "tel:112";
    } else {
      setShowBanner((prev) => !prev);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 mt-16 relative z-10">
      <style>{`
        .custom-disaster-icon {
          display: flex; align-items: center; justify-content: center;
        }
        .chatbot-container {
          position: fixed;
          bottom: 4rem;
          right: 1rem;
          width: 25rem;
          height: 30rem;
          background: white;
          border-radius: 0.5rem;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          border: 1px solid #e5e7eb;
          transform: translateY(100%);
          opacity: 0;
          transition: all 0.3s ease-in-out;
          z-index: 60;
          overflow: hidden;
        }
        .chatbot-container.open {
          transform: translateY(0);
          opacity: 1;
        }
        .chatbot-toggle-btn {
          position: fixed;
          bottom: 1rem;
          right: 1rem;
          background: #2563eb;
          color: white;
          padding: 0.75rem;
          border-radius: 9999px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          z-index: 100;
          cursor: pointer;
          pointer-events: auto;
        }
        .chatbot-toggle-btn:hover {
          background: #1d4ed8;
        }
        .chatbot-iframe {
          width: 100%;
          height: 100%;
          border: none;
        }
        .emergency-btn {
          position: fixed;
          top: 50%;
          right: 0;
          transform: translateY(-50%);
          background: #2563eb;
          color: white;
          padding: 0.5rem;
          border-radius: 0.5rem 0 0 0.5rem;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          z-index: 100;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 3rem;
          height: 3rem;
        }
        .emergency-btn:hover {
          background: #1d4ed8;
        }
        .emergency-banner {
          position: fixed;
          top: 50%;
          right: 3.5rem;
          transform: translateY(-50%);
          background: #FF0000;
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 0.5rem 0 0 0.5rem;
          box-shadow: 0 4px 6px rgba(0,0,0,0.2);
          z-index: 1000;
          display: none;
          animation: slideIn 0.3s ease-in-out forwards;
        }
        .emergency-banner.show {
          display: block;
        }
        @keyframes slideIn {
          from { transform: translateY(-50%) translateX(100%); }
          to { transform: translateY(-50%) translateX(0); }
        }
      `}</style>

      <header className="bg-blue-600 text-white py-8 px-4 w-full text-center z-10">
        <h1 className="text-3xl md:text-4xl font-bold">Disaster Safety App</h1>
        <p className="text-lg mt-2">Hi, {username}!</p>
        <p className="text-lg mt-2">Stay informed. Stay safe.</p>
      </header>

      {/* Weather Section */}
      <section className="p-4 md:p-6">
        <div className="bg-white shadow-md p-6 rounded-lg text-center">
          <div className="flex items-center justify-center space-x-3 mb-3">
            <FaCloudSun className="text-yellow-500 text-3xl" />
            <p className="text-lg font-medium">Weather: {weather}</p>
          </div>
          <p className="text-sm text-gray-500">
            {location.lat && location.lon
              ? `Lat: ${location.lat}, Lon: ${location.lon}`
              : "Fetching location..."}
          </p>
        </div>
      </section>

      {/* Map Section */}
      <section className="p-4 md:p-6 relative z-0">
        <div className="bg-white shadow-md p-6 rounded-lg text-center">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">
              🛰️ Live Disaster Map (India)
            </h2>
            <button
              onClick={fetchDisasterData}
              className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              <FaSyncAlt />
              <span>Refresh</span>
            </button>
          </div>
          <MapContainer
            center={[22.9734, 78.6569]}
            zoom={5}
            scrollWheelZoom={false}
            style={{ height: "500px", width: "100%", zIndex: 0 }}
          >
            <TileLayer
              attribution="© OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {disasters.map((d, idx) => (
              <Marker
                key={idx}
                position={[d.lat, d.lng]}
                icon={getDisasterIcon(d.event_type)}
              >
                <Popup>
                  <strong>{d.event_name || "Unknown Event"}</strong>
                  <br />
                  Type: {iconMap[d.event_type]?.name || "Unknown"}
                  <br />
                  Date: {d.date || "N/A"}
                  <br />
                  Continent: {d.continent || "N/A"}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </section>

      {/* Prediction */}
      <section className="p-4 md:p-6">
        <div className="bg-white shadow-md p-6 rounded-lg text-center">
          <FaChartLine className="text-purple-500 text-4xl mx-auto" />
          <h2 className="text-xl md:text-2xl font-semibold mt-4">
            Detailed Disaster Prediction
          </h2>
          <p className="text-gray-600 mt-2">
            View in-depth analysis of disaster risks in your area.
          </p>
          <button
            className="mt-4 bg-purple-500 text-white px-6 py-2 rounded-md"
            onClick={() => navigate("/app/disaster-prediction")}
          >
            View Prediction
          </button>
        </div>
      </section>

      {/* Safe Route + Safety Guide */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 md:p-6">
        <div className="bg-white shadow-md p-6 rounded-lg text-center">
          <FaMapMarkerAlt className="text-blue-500 text-4xl mx-auto" />
          <h2 className="text-xl md:text-2xl font-semibold mt-4">
            Find Safe Routes
          </h2>
          <p className="text-gray-600 mt-2">
            Navigate to the nearest hospitals and police stations.
          </p>
          <button
            onClick={() => navigate("/app/safe-route")}
            className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-md"
          >
            Open Map
          </button>
        </div>
        <div className="bg-white shadow-md p-6 rounded-lg text-center">
          <FaExclamationTriangle className="text-orange-500 text-4xl mx-auto" />
          <h2 className="text-xl md:text-2xl font-semibold mt-4">
            Safety Guide
          </h2>
          <p className="text-gray-600 mt-2">
            Learn what to do during different disasters.
          </p>
          <button
            onClick={() => navigate("/app/alerts")}
            className="mt-4 bg-orange-500 text-white px-6 py-2 rounded-md"
          >
            View Guide
          </button>
        </div>
      </section>

      {/* Food Section */}
      <section className="p-4 md:p-6">
        <div className="bg-white shadow-md p-6 rounded-lg text-center">
          <FaUtensils className="text-green-500 text-4xl mx-auto" />
          <h2 className="text-xl md:text-2xl font-semibold">
            Food Availability
          </h2>
          <p className="text-gray-600 mt-2">
            Check for basic necessities like milk, bread, and water.
          </p>
          <button
            onClick={() => navigate("/app/food-availability")}
            className="mt-4 bg-green-500 text-white px-6 py-2 rounded-md"
          >
            Check Availability
          </button>
        </div>
      </section>

      {/* Chatbot */}
      <button className="chatbot-toggle-btn" onClick={toggleBot}>
        <FaRobot className="text-xl" />
      </button>
      <div className={`chatbot-container ${isBotOpen ? "open" : ""}`}>
        <iframe
          className="chatbot-iframe"
          src="https://www.chatbase.co/chatbot-iframe/GSNeaRvEY_U9kyobj-pAt"
          title="Chatbot"
        ></iframe>
      </div>

      {/* Emergency Button */}
      <button className="emergency-btn" onClick={handleEmergencyClick}>
        <FaPhone className="text-white text-xl" />
      </button>

      {/* Emergency Banner */}
      {showBanner && (
        <div className="emergency-banner show">
          Dial 112 for disaster emergency
        </div>
      )}
    </div>
  );
};

export default Home;

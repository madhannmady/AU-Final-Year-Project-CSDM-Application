import { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker, Circle } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "500px",
};

const DEFAULT_CENTER = { lat: 13.08268, lng: 80.270721 }; // Fallback center (Chennai, India)

const DisasterPrediction = () => {
  const API_KEY = "AIzaSyBInespaE2kKbBK0lA9jNLvsdk8N2GZNqA";
  const [alerts, setAlerts] = useState([]);
  const [mapError, setMapError] = useState(null);
  const [mapCenter, setMapCenter] = useState(DEFAULT_CENTER);

  useEffect(() => {
    const fetchDisasterAlerts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/alerts");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const activeAlerts = Array.isArray(data.alerts)
          ? data.alerts.filter((alert) => alert.active === true)
          : [];
        setAlerts(activeAlerts);

        // Calculate new center based on active alerts
        if (activeAlerts.length > 0) {
          const avgLat =
            activeAlerts.reduce((sum, alert) => sum + alert.lat, 0) /
            activeAlerts.length;
          const avgLon =
            activeAlerts.reduce((sum, alert) => sum + alert.lon, 0) /
            activeAlerts.length;
          setMapCenter({ lat: avgLat, lng: avgLon });
        } else {
          setMapCenter(DEFAULT_CENTER);
        }
      } catch (error) {
        console.error("Error fetching disaster alerts:", error);
        setAlerts([]);
        setMapCenter(DEFAULT_CENTER);
        setMapError("Failed to fetch alerts. Please check the backend server.");
      }
    };

    fetchDisasterAlerts();
    const interval = setInterval(fetchDisasterAlerts, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 p-6 pt-24">
      <header className="bg-red-600 text-white py-4 px-6 text-center">
        <h1 className="text-3xl font-bold">Disaster Alerts</h1>
        <p className="text-lg">Live disaster tracking on Google Maps</p>
      </header>

      {mapError && (
        <div className="text-red-500 text-center my-4">{mapError}</div>
      )}

      <LoadScript
        googleMapsApiKey={API_KEY}
        onError={(error) => {
          console.error("Google Maps API Error:", error);
          setMapError("Failed to load Google Maps. Check your API key.");
        }}
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={mapCenter}
          zoom={alerts.length > 0 ? 10 : 20}
        >
          {alerts.map((alert) => (
            <div key={alert.id}>
              <Marker
                position={{ lat: alert.lat, lng: alert.lon }}
                icon={{
                  url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
                }}
              />
              <Circle
                center={{ lat: alert.lat, lng: alert.lon }}
                radius={2500}
                options={{
                  strokeColor: "#FF0000",
                  strokeOpacity: 0.8,
                  strokeWeight: 2,
                  fillColor: "#FF0000",
                  fillOpacity: 0.2,
                }}
              />
            </div>
          ))}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default DisasterPrediction;

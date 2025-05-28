import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useLocationContext } from "../Context/LocationContext";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
function LocationMarker({ setLocation }) {
  LocationMarker.propTypes = {
    setLocation: PropTypes.func.isRequired,
  };

  const [position, setPosition] = useState(null);

  useMapEvents({
    click(e) {
      setPosition(e.latlng);
      setLocation({ lat: e.latlng.lat, lon: e.latlng.lng });
    },
  });

  return position === null ? null : <Marker position={position} />;
}

function AdminDashboard() {
  const { location } = useLocationContext();
  const [alerts, setAlerts] = useState([]);
  const [isAlertActive, setIsAlertActive] = useState(false);
  const [foodItem, setFoodItem] = useState("");
  const [foodLocation, setFoodLocation] = useState({
    lat: location.lat,
    lon: location.lon,
  });
  const [foodList, setFoodList] = useState([]);

  useEffect(() => {
    fetchAlerts();
    fetchFoodItems();
  }, []);

  const fetchAlerts = async () => {
    const response = await fetch("http://localhost:5000/api/alerts");
    const data = await response.json();
    setAlerts(data.alerts);
    setIsAlertActive(
      data.alerts.some(
        (alert) => alert.lat === location.lat && alert.lon === location.lon
      )
    );
  };

  const toggleAlert = async () => {
    if (isAlertActive) {
      const alertToDelete = alerts.find(
        (alert) => alert.lat === location.lat && alert.lon === location.lon
      );
      if (alertToDelete) {
        await fetch(`http://localhost:5000/api/alerts/${alertToDelete.id}`, {
          method: "DELETE",
        });
        alert("Alert Removed!");
      }
    } else {
      const response = await fetch("http://localhost:5000/api/alerts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lat: location.lat,
          lon: location.lon,
          active: true,
        }),
      });
      if (response.ok) {
        alert("Alert Added!");
      }
    }
    fetchAlerts();
    setIsAlertActive(!isAlertActive);
  };

  const fetchFoodItems = async () => {
    const response = await fetch("http://localhost:5000/api/food/food-items");
    const data = await response.json();
    setFoodList(data);
  };

  const handleFoodSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/food/add-food", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ foodItem, location: foodLocation }),
      });
      const textResponse = await response.text();
      if (!response.ok) throw new Error(`Server Error: ${textResponse}`);
      const data = JSON.parse(textResponse);
      alert(data.message);
      fetchFoodItems();
      setFoodItem("");
      setFoodLocation({ lat: location.lat, lon: location.lon });
    } catch (error) {
      console.error("Fetch Error:", error);
      alert("Something went wrong: " + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 pt-20">
      <h1 className="text-3xl font-bold text-center mb-6">Admin Dashboard</h1>

      <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Disaster Alerts</h2>
        <button
          onClick={toggleAlert}
          className={`w-full py-2 rounded ${
            isAlertActive ? "bg-red-500" : "bg-green-500"
          } text-white`}
        >
          {isAlertActive ? "Disable Alert" : "Enable Alert"}
        </button>
      </div>

      <div className="max-w-lg mx-auto mt-6 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Active Alerts</h2>
        <ul>
          {alerts.map((alert, index) => (
            <li key={index} className="border-b p-2">
              🌍 {alert.lat}, {alert.lon}
            </li>
          ))}
        </ul>
      </div>

      <div className="max-w-lg mx-auto mt-6 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Add Disaster Relief Food</h2>
        <form onSubmit={handleFoodSubmit}>
          <input
            type="text"
            placeholder="Food Item"
            className="w-full p-2 mb-3 border rounded"
            value={foodItem}
            onChange={(e) => setFoodItem(e.target.value)}
            required
          />
          <MapContainer
            center={[location.lat, location.lon]}
            zoom={13}
            style={{ height: "300px", width: "100%", marginBottom: "20px" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <LocationMarker setLocation={setFoodLocation} />
          </MapContainer>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded"
          >
            Submit
          </button>
        </form>
      </div>

      <div className="max-w-lg mx-auto mt-6 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Food Distribution List</h2>
        <ul>
          {foodList.map((food, index) => (
            <li key={index} className="border-b p-2">
              {food.foodItem} -{" "}
              <a
                href={`https://www.google.com/maps?q=${food.location.lat},${food.location.lon}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Map
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AdminDashboard;

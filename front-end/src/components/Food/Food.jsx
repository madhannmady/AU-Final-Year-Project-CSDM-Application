import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { FaTrash } from "react-icons/fa"; // Import the trash icon

function Food() {
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFoodAvailability();
  }, []);

  const fetchFoodAvailability = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/food/food-items");
      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);

      const data = await response.json();
      console.log("Fetched Food Items:", data);
      setFoodItems(data);
    } catch (error) {
      console.error("Error fetching food availability:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteFood = async (foodId, foodItem) => {
    if (!window.confirm(`Are you sure you want to delete ${foodItem}?`)) {
      return; // Cancel deletion if user declines
    }

    try {
      console.log(`Sending DELETE request for food ID: ${foodId}`);
      const response = await fetch(
        `http://localhost:5000/api/food/delete-food/${foodId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Delete Response:", result);

      // Update the foodItems state to remove the deleted item immediately
      setFoodItems((prevItems) =>
        prevItems.filter((item) => item._id !== foodId)
      );
      console.log(`Food item ${foodId} removed from UI`);
    } catch (error) {
      console.error("Error deleting food item:", error);
      alert(`Failed to delete food item: ${error.message}. Check server logs.`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-6 pt-24">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        🍽️ Available Food Items
      </h2>

      {loading ? (
        <div className="flex items-center justify-center">
          <span className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full"></span>
        </div>
      ) : foodItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
          {foodItems.map((food) => (
            <div
              key={food._id}
              className="bg-black text-white p-6 rounded-lg shadow-lg flex flex-col items-center relative border-4 border-white"
              style={{ minHeight: "400px" }}
            >
              <button
                className="absolute top-2 right-2 text-red-500 hover:text-red-700 focus:outline-none"
                onClick={() => handleDeleteFood(food._id, food.foodItem)}
              >
                <FaTrash size={20} /> {/* Dustbin icon */}
              </button>
              <h3 className="text-2xl font-bold mb-4 text-center">
                {food.foodItem}
              </h3>
              {food.location && food.location.lat && food.location.lon ? (
                <>
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded mb-4"
                    onClick={() =>
                      window.open(
                        `https://www.google.com/maps?q=${food.location.lat},${food.location.lon}`,
                        "_blank"
                      )
                    }
                  >
                    View Map
                  </button>
                  <div className="w-full flex-1 bg-black flex items-center justify-center">
                    <MapContainer
                      center={[food.location.lat, food.location.lon]}
                      zoom={13}
                      style={{
                        height: "200px",
                        width: "100%",
                        border: "2px solid white",
                        backgroundColor: "black",
                      }}
                      className="rounded"
                    >
                      <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      />
                      <Marker
                        position={[food.location.lat, food.location.lon]}
                      />
                    </MapContainer>
                  </div>
                </>
              ) : (
                <p className="text-sm text-red-500">
                  Location data unavailable
                </p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No food available at the moment. 🍽️</p>
      )}
    </div>
  );
}

export default Food;

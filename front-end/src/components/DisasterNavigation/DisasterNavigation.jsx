import React, { useState, useEffect } from "react";
import {
  LoadScript,
  GoogleMap,
  Marker,
  DirectionsRenderer,
} from "@react-google-maps/api";

const libraries = ["places"];

const DisasterNavigation = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [hospital, setHospital] = useState(null);
  const [policeStation, setPoliceStation] = useState(null);
  const [directions, setDirections] = useState(null);
  const [googleLoaded, setGoogleLoaded] = useState(false);
  const [showHospital, setShowHospital] = useState(false);
  const [showPoliceStation, setShowPoliceStation] = useState(false);

  const containerStyle = {
    width: "100vw",
    height: "100vh",
  };

  const API_KEY = "AIzaSyBInespaE2kKbBK0lA9jNLvsdk8N2GZNqA";

  // Get current location using geolocation
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const loc = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setCurrentLocation(loc);
        console.log("Current Location Updated:", loc);
      },
      (error) => {
        console.error("Error fetching location:", error);
      }
    );
  }, []);

  // ✅ Log only when `currentLocation` updates
  useEffect(() => {
    if (currentLocation) {
      console.log("Updated Current Location:", currentLocation);
    }
  }, [currentLocation]);

  // Fetch nearby places only when Google API is ready
  useEffect(() => {
    if (currentLocation && googleLoaded) {
      console.log("Fetching Nearby Places...");

      const fetchNearbyPlaces = (type, setState) => {
        const map = new google.maps.Map(document.createElement("div"));
        const service = new google.maps.places.PlacesService(map);

        const request = {
          location: currentLocation,
          radius: 5000,
          type: type, // Type of place (e.g., hospital, police)
        };

        service.nearbySearch(request, (results, status) => {
          if (
            status === google.maps.places.PlacesServiceStatus.OK &&
            results.length > 0
          ) {
            console.log(`Found ${type}:`, results[0]);
            setState(results[0]); // Store first result
          } else {
            console.warn(`No nearby ${type} found.`);
          }
        });
      };

      fetchNearbyPlaces("hospital", setHospital);
      fetchNearbyPlaces("police", setPoliceStation);
    }
  }, [currentLocation, googleLoaded]);

  useEffect(() => {
    if (hospital) console.log("Hospital Found:", hospital);
    if (policeStation) console.log("Police Station Found:", policeStation);
  }, [hospital, policeStation]);

  const handleGoogleScriptLoad = () => {
    setGoogleLoaded(true);
    console.log("Google Maps API Loaded!");
  };

  const findRoute = (destination, type) => {
    if (!currentLocation || !destination) {
      console.warn("Current location or destination is missing.");
      return;
    }

    const directionsService = new google.maps.DirectionsService();

    directionsService.route(
      {
        origin: currentLocation,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          setDirections(result);

          if (type === "hospital") {
            setShowHospital(true);
            setShowPoliceStation(false);
          } else if (type === "police") {
            setShowHospital(false);
            setShowPoliceStation(true);
          }
        } else {
          console.error("Directions request failed due to", status);
        }
      }
    );
  };

  return (
    <div className="w-screen h-screen">
      <h1 className="text-3xl font-bold text-center mb-4">
        Disaster Navigation
      </h1>
      <div className="flex justify-center mb-4">
        <button
          className="bg-blue-500 text-white p-2 rounded mr-4"
          onClick={() => {
            console.log("Find Nearest Hospital Button Clicked");
            if (hospital && hospital.geometry?.location) {
              findRoute(hospital.geometry.location, "hospital");
            } else {
              console.warn("Hospital location is not available.");
            }
          }}
        >
          Find Nearest Hospital
        </button>

        <button
          className="bg-green-500 text-white p-2 rounded"
          onClick={() => {
            console.log("Find Nearest Police Station Button Clicked");
            if (policeStation && policeStation.geometry?.location) {
              findRoute(policeStation.geometry.location, "police");
            } else {
              console.warn("Police Station location is not available.");
            }
          }}
        >
          Find Nearest Police Station
        </button>
      </div>

      <LoadScript
        googleMapsApiKey={API_KEY}
        libraries={["places"]}
        onLoad={handleGoogleScriptLoad}
      >
        {currentLocation && googleLoaded ? (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={currentLocation}
            zoom={12}
          >
            <Marker position={currentLocation} label="You" />

            {/* Show hospital marker only when button is clicked */}
            {showHospital && hospital && (
              <Marker
                position={{
                  lat: hospital.geometry.location.lat(),
                  lng: hospital.geometry.location.lng(),
                }}
                label="Hospital"
              />
            )}

            {/* Show police marker only when button is clicked */}
            {showPoliceStation && policeStation && (
              <Marker
                position={{
                  lat: policeStation.geometry.location.lat(),
                  lng: policeStation.geometry.location.lng(),
                }}
                label="Police"
              />
            )}

            {directions && <DirectionsRenderer directions={directions} />}
          </GoogleMap>
        ) : (
          <div>Loading Map...</div>
        )}
      </LoadScript>
    </div>
  );
};

export default DisasterNavigation;

import { useEffect, useState } from "react";
import axios from "axios";

const DisasterAlerts = () => {
    const [loading, setLoading] = useState(true);
    const safetyMessage = `
        🚨 Earthquake Alert 🚨Stay calm. Do not run outside,If indoors, take cover under a sturdy object. If outside, move away from buildings, trees, and power lines.
    `;

    useEffect(() => {
        const fetchAlerts = async () => {
            try {
                const response = await axios.get(
                    "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.geojson"
                );

                // If significant earthquakes exist, send a safety alert
                if (response.data.features.length > 0) {
                    await axios.post("http://localhost:5000/send-sms", { message: safetyMessage });
                }
            } catch (error) {
                console.error("Error fetching alerts:", error);
            } finally {


                setLoading(false);
            }
        };

        fetchAlerts();
    }, []);

    return (
        <div className="p-6 bg-white shadow-lg rounded-lg w-full max-w-2xl mx-auto mt-36 pt-12">
            <h2 className="text-2xl font-semibold text-red-600 flex items-center gap-2 ">
                🚨 Earthquake Safety Alert
            </h2>
            {loading ? (
                <p className="text-gray-600 mt-2">Checking for alerts...</p>
            ) : (
                <div className="mt-4 p-4 border rounded-md bg-gray-50">
                    <p className="text-gray-800 font-semibold">{safetyMessage}</p>
                </div>
            )}
        </div>
    );
};

export default DisasterAlerts;

import { FaExclamationTriangle } from "react-icons/fa";

function Landslide() {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6 pt-24">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
        Landslide
      </h1>
      <div className="max-w-3xl mx-auto text-center">
        <FaExclamationTriangle className="text-yellow-500 text-6xl mx-auto mb-4" />
        <p className="text-gray-700 mb-6">
          The downward movement of rock, soil, and debris due to gravity, often
          triggered by heavy rain or earthquakes.
        </p>
        <div className="bg-yellow-100 p-6 rounded-xl">
          <h2 className="text-2xl font-semibold mb-4">Landslide Features</h2>
          <p>
            Implement your Landslide-specific features here (e.g., risk zones,
            prevention tips, etc.)
          </p>
        </div>
      </div>
    </div>
  );
}

export default Landslide;

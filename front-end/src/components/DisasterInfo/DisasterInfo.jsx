import {
  FaWater,
  FaGlobeAmericas,
  FaFire,
  FaWind,
  FaExclamationTriangle,
} from "react-icons/fa";
import { Link } from "react-router-dom";

function DisasterInfo() {
  const disasters = [
    {
      name: "Tsunami",
      icon: <FaWater className="text-blue-500 text-5xl" />,
      bgColor: "bg-blue-100",
      path: "/app/tsunami",
    },
    {
      name: "Earthquake",
      icon: <FaGlobeAmericas className="text-gray-700 text-5xl" />,
      bgColor: "bg-gray-100",
      path: "/app/earthquake",
    },
    {
      name: "Wildfire",
      icon: <FaFire className="text-red-500 text-5xl" />,
      bgColor: "bg-red-100",
      path: "/app/wildfire",
    },
    {
      name: "Hurricane",
      icon: <FaWind className="text-indigo-500 text-5xl" />,
      bgColor: "bg-indigo-100",
      path: "/app/hurricane",
    },
    {
      name: "Landslide",
      icon: <FaExclamationTriangle className="text-yellow-500 text-5xl" />,
      bgColor: "bg-yellow-100",
      path: "/app/landslide",
    },
    {
      name: "Flood",
      icon: <FaWater className="text-blue-700 text-5xl" />,
      bgColor: "bg-blue-200",
      path: "/app/flood",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6 pt-24">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
        🌍 Understanding Natural Disasters
      </h1>
      <p className="text-center text-gray-600 mb-10 max-w-3xl mx-auto">
        Natural disasters are catastrophic events caused by Earth's natural
        processes. Click a disaster to learn more and explore related features.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {disasters.map((disaster, index) => (
          <Link
            key={index}
            to={disaster.path}
            className={`p-6 rounded-2xl shadow-lg ${disaster.bgColor} flex flex-col items-center text-center hover:scale-105 transition-transform duration-200`}
          >
            {disaster.icon}
            <h2 className="text-2xl font-semibold text-gray-900 mt-4">
              {disaster.name}
            </h2>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default DisasterInfo;

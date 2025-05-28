import { FaWater } from "react-icons/fa";
import { Chart } from "react-chartjs-2";
import { useTranslation } from "react-i18next";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Tsunami() {
  const { t, i18n } = useTranslation();

  const tsunamiData = {
    labels: ["1762", "1881", "1941", "2004", "1679", "1300-1400"],
    datasets: [
      {
        label: "Fatalities",
        data: [200, 150, 100, 26014, 50, 500],
        backgroundColor: "rgba(54, 162, 235, 0.8)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
        borderRadius: 8,
        barThickness: 30,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: { font: { size: 14, weight: "bold" }, color: "#333" },
      },
      title: {
        display: true,
        text: "Tsunami Chronology in India",
        font: { size: 18, weight: "bold" },
        color: "#2d3748",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Fatalities",
          font: { size: 14 },
          color: "#4a5568",
        },
        ticks: { font: { size: 12 }, color: "#4a5568" },
        grid: { color: "rgba(0, 0, 0, 0.05)", drawBorder: false },
      },
      x: {
        title: {
          display: true,
          text: "Year",
          font: { size: 14 },
          color: "#4a5568",
        },
        ticks: { font: { size: 12 }, color: "#4a5568" },
        grid: { display: false },
      },
    },
    layout: { padding: { top: 20, bottom: 10, left: 10, right: 10 } },
    barPercentage: 0.8,
    categoryPercentage: 0.9,
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6 pt-24">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Tsunami</h1>
        <FaWater className="text-blue-500 text-6xl" />
      </div>

      <div className="w-full h-48 mb-6 flex items-center justify-center">
        <img
          src="/public/tsunami.jpg"
          alt="Tsunami devastation in 2004"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Unveiling the Tsunami Phenomenon
        </h2>
        <p className="text-gray-700 text-justify">
          A tsunami is a series of powerful ocean waves triggered by the sudden
          displacement of a large volume of water, most commonly due to
          underwater earthquakes, volcanic eruptions, or landslides. These waves
          can travel across vast distances at speeds of up to 800 kilometers per
          hour in the open ocean, often going unnoticed as they form low, broad
          humps. However, as they approach shallow coastal waters, the waves
          slow down and dramatically increase in height, sometimes reaching over
          30 meters, transforming into destructive walls of water. Tsunamis are
          particularly devastating in regions with dense coastal populations and
          limited natural barriers. In the Indian Ocean, the 2004
          Sumatra-Andaman earthquake (magnitude 9.1-9.3) generated the deadliest
          tsunami in recorded history, affecting 14 countries and causing over
          230,000 deaths, with significant impact on India's eastern coast and
          Andaman & Nicobar Islands. The phenomenon is rare in India due to its
          geographical position, but the risk is heightened in subduction zones
          like the Andaman-Nicobar-Sumatra arc, where tectonic activity can
          unleash such catastrophic events.
        </p>
      </div>

      <div className="mb-6 flex justify-center space-x-4">
        <button
          onClick={() => changeLanguage("en")}
          className="px-6 py-3 bg-gradient-to-r from-blue-400 to-blue-600 text-white font-semibold rounded-lg shadow-md hover:from-blue-500 hover:to-blue-700 transition-all duration-300 transform hover:scale-105"
        >
          English
        </button>
        <button
          onClick={() => changeLanguage("ta")}
          className="px-6 py-3 bg-gradient-to-r from-blue-400 to-blue-600 text-white font-semibold rounded-lg shadow-md hover:from-blue-500 hover:to-blue-700 transition-all duration-300 transform hover:scale-105"
        >
          Tamil
        </button>
        <button
          onClick={() => changeLanguage("te")}
          className="px-6 py-3 bg-gradient-to-r from-blue-400 to-blue-600 text-white font-semibold rounded-lg shadow-md hover:from-blue-500 hover:to-blue-700 transition-all duration-300 transform hover:scale-105"
        >
          Telugu
        </button>
        <button
          onClick={() => changeLanguage("ml")}
          className="px-6 py-3 bg-gradient-to-r from-blue-400 to-blue-600 text-white font-semibold rounded-lg shadow-md hover:from-blue-500 hover:to-blue-700 transition-all duration-300 transform hover:scale-105"
        >
          Malayalam
        </button>
        <button
          onClick={() => changeLanguage("hi")}
          className="px-6 py-3 bg-gradient-to-r from-blue-400 to-blue-600 text-white font-semibold rounded-lg shadow-md hover:from-blue-500 hover:to-blue-700 transition-all duration-300 transform hover:scale-105"
        >
          Hindi
        </button>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="bg-blue-100 p-4 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            {t("dos-title")}
          </h3>
          <ul className="text-gray-700">
            <li>☞ {t("tsunami-dos-1")}</li>
            <li>☞ {t("tsunami-dos-2")}</li>
            <li>☞ {t("tsunami-dos-3")}</li>
          </ul>
        </div>
        <div className="bg-blue-100 p-4 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            {t("donts-title")}
          </h3>
          <ul className="text-gray-700">
            <li>☞ {t("tsunami-donts-1")}</li>
            <li>☞ {t("tsunami-donts-2")}</li>
            <li>☞ {t("tsunami-donts-3")}</li>
          </ul>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Tsunami Chronology in India
        </h2>
        <div className="w-full max-w-2xl mx-auto bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl shadow-lg border border-blue-200">
          <div className="w-full h-96">
            <Chart type="bar" data={tsunamiData} options={options} />
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Additional Resources
        </h2>
        <ul className="list-disc pl-5 text-blue-500">
          <li>
            <a
              href="https://en.wikipedia.org/wiki/2004_Indian_Ocean_earthquake_and_tsunami"
              target="_blank"
              rel="noopener noreferrer"
            >
              Wikipedia - 2004 Tsunami
            </a>
          </li>
          <li>
            <a
              href="https://www.youtube.com/results?search_query=tsunami+safety+tips"
              target="_blank"
              rel="noopener noreferrer"
            >
              YouTube - Tsunami Safety Tips
            </a>
          </li>
          <li>
            <a
              href="https://www.google.com/search?q=Recent+articles+on+tsunamis+in+India"
              target="_blank"
              rel="noopener noreferrer"
            >
              Article - Recent Articles on Tsunamis in India
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Tsunami;

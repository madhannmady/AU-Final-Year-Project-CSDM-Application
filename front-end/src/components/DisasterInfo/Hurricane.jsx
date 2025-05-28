import { FaWind } from "react-icons/fa";
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

function Hurricane() {
  const { t, i18n } = useTranslation();

  const hurricaneData = {
    labels: ["1977", "1999", "2013", "2020"],
    datasets: [
      {
        label: "Fatalities",
        data: [10000, 10000, 100, 100],
        backgroundColor: "rgba(99, 102, 241, 0.8)",
        borderColor: "rgba(99, 102, 241, 1)",
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
        text: "Hurricane Chronology in India",
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
        <h1 className="text-4xl font-bold text-gray-800">Hurricane</h1>
        <FaWind className="text-indigo-500 text-6xl" />
      </div>

      <div className="w-full h-48 mb-6 flex items-center justify-center">
        <img
          src="/public/hurricane.jpg"
          alt="Cyclone Phailin 2013"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Unveiling the Hurricane Phenomenon
        </h2>
        <p className="text-gray-700 text-justify">
          A hurricane, known as a cyclone in the Indian Ocean, is a powerful
          tropical storm characterized by strong winds, heavy rainfall, and
          storm surges, forming over warm ocean waters. In India, these storms
          primarily affect the eastern and western coasts, driven by the Bay of
          Bengal and Arabian Sea. Notable cyclones include the 1999 Odisha Super
          Cyclone (magnitude 3, ~10,000 deaths) and Cyclone Phailin in 2013
          (magnitude 4, ~100 deaths), showcasing improved preparedness reducing
          fatalities. India’s vulnerability stems from its low-lying coastal
          regions and dense population, with climate change intensifying cyclone
          frequency and strength. The Indian Meteorological Department plays a
          crucial role in forecasting and issuing timely warnings to mitigate
          the impact on life and property.
        </p>
      </div>

      <div className="mb-6 flex justify-center space-x-4">
        <button
          onClick={() => changeLanguage("en")}
          className="px-6 py-3 bg-gradient-to-r from-indigo-400 to-indigo-600 text-white font-semibold rounded-lg shadow-md hover:from-indigo-500 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105"
        >
          English
        </button>
        <button
          onClick={() => changeLanguage("ta")}
          className="px-6 py-3 bg-gradient-to-r from-indigo-400 to-indigo-600 text-white font-semibold rounded-lg shadow-md hover:from-indigo-500 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105"
        >
          Tamil
        </button>
        <button
          onClick={() => changeLanguage("te")}
          className="px-6 py-3 bg-gradient-to-r from-indigo-400 to-indigo-600 text-white font-semibold rounded-lg shadow-md hover:from-indigo-500 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105"
        >
          Telugu
        </button>
        <button
          onClick={() => changeLanguage("ml")}
          className="px-6 py-3 bg-gradient-to-r from-indigo-400 to-indigo-600 text-white font-semibold rounded-lg shadow-md hover:from-indigo-500 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105"
        >
          Malayalam
        </button>
        <button
          onClick={() => changeLanguage("hi")}
          className="px-6 py-3 bg-gradient-to-r from-indigo-400 to-indigo-600 text-white font-semibold rounded-lg shadow-md hover:from-indigo-500 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105"
        >
          Hindi
        </button>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="bg-indigo-100 p-4 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            {t("dos-title")}
          </h3>
          <ul className="text-gray-700">
            <li>☞ {t("hurricane-dos-1")}</li>
            <li>☞ {t("hurricane-dos-2")}</li>
            <li>☞ {t("hurricane-dos-3")}</li>
          </ul>
        </div>
        <div className="bg-indigo-100 p-4 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            {t("donts-title")}
          </h3>
          <ul className="text-gray-700">
            <li>☞ {t("hurricane-donts-1")}</li>
            <li>☞ {t("hurricane-donts-2")}</li>
            <li>☞ {t("hurricane-donts-3")}</li>
          </ul>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Hurricane Chronology in India
        </h2>
        <div className="w-full max-w-2xl mx-auto bg-gradient-to-br from-indigo-50 to-white p-6 rounded-xl shadow-lg border border-indigo-300">
          <div className="w-full h-96">
            <Chart type="bar" data={hurricaneData} options={options} />
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Additional Resources
        </h2>
        <ul className="list-disc pl-5 text-indigo-500">
          <li>
            <a
              href="https://en.wikipedia.org/wiki/Cyclones_in_India"
              target="_blank"
              rel="noopener noreferrer"
            >
              Wikipedia - Cyclones in India
            </a>
          </li>
          <li>
            <a
              href="https://www.youtube.com/results?search_query=hurricane+safety+tips"
              target="_blank"
              rel="noopener noreferrer"
            >
              YouTube - Hurricane Safety Tips
            </a>
          </li>
          <li>
            <a
              href="https://www.google.com/search?q=Recent+articles+on+hurricanes+in+India"
              target="_blank"
              rel="noopener noreferrer"
            >
              Article - Recent Articles on Hurricanes in India
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Hurricane;

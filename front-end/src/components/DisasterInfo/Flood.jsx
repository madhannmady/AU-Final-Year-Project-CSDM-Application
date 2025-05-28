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

function Flood() {
  const { t, i18n } = useTranslation();

  const floodData = {
    labels: ["1978", "2005", "2013", "2019"],
    datasets: [
      {
        label: "Fatalities",
        data: [2000, 1000, 6000, 200],
        backgroundColor: "rgba(59, 130, 246, 0.8)",
        borderColor: "rgba(59, 130, 246, 1)",
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
        text: "Flood Chronology in India",
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
        <h1 className="text-4xl font-bold text-gray-800">Flood</h1>
        <FaWater className="text-blue-700 text-6xl" />
      </div>

      <div className="w-full h-48 mb-6 flex items-center justify-center">
        <img
          src="/public/flood.jpg"
          alt="2013 North India Floods"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Unveiling the Flood Phenomenon
        </h2>
        <p className="text-gray-700 text-justify">
          A flood is an overflow of water that submerges land, typically caused
          by heavy rainfall, river overflow, or coastal storm surges. In India,
          floods are a recurring disaster, affecting millions annually due to
          its monsoon climate, with the Ganges-Brahmaputra-Meghna basin being
          particularly prone. The 2013 Uttarakhand floods, triggered by
          cloudbursts and glacial lake outbursts, resulted in over 6,000 deaths
          and displaced thousands, marking one of the worst flood disasters.
          India’s vulnerability is heightened by deforestation, urbanization,
          and inadequate drainage systems, leading to significant economic and
          human losses. Effective flood management, including early warning
          systems and resilient infrastructure, is essential to mitigate the
          impact across the country’s vast riverine and coastal regions.
        </p>
      </div>

      <div className="mb-6 flex justify-center space-x-4">
        <button
          onClick={() => changeLanguage("en")}
          className="px-6 py-3 bg-gradient-to-r from-blue-200 to-blue-400 text-white font-semibold rounded-lg shadow-md hover:from-blue-300 hover:to-blue-500 transition-all duration-300 transform hover:scale-105"
        >
          English
        </button>
        <button
          onClick={() => changeLanguage("ta")}
          className="px-6 py-3 bg-gradient-to-r from-blue-200 to-blue-400 text-white font-semibold rounded-lg shadow-md hover:from-blue-300 hover:to-blue-500 transition-all duration-300 transform hover:scale-105"
        >
          Tamil
        </button>
        <button
          onClick={() => changeLanguage("te")}
          className="px-6 py-3 bg-gradient-to-r from-blue-200 to-blue-400 text-white font-semibold rounded-lg shadow-md hover:from-blue-300 hover:to-blue-500 transition-all duration-300 transform hover:scale-105"
        >
          Telugu
        </button>
        <button
          onClick={() => changeLanguage("ml")}
          className="px-6 py-3 bg-gradient-to-r from-blue-200 to-blue-400 text-white font-semibold rounded-lg shadow-md hover:from-blue-300 hover:to-blue-500 transition-all duration-300 transform hover:scale-105"
        >
          Malayalam
        </button>
        <button
          onClick={() => changeLanguage("hi")}
          className="px-6 py-3 bg-gradient-to-r from-blue-200 to-blue-400 text-white font-semibold rounded-lg shadow-md hover:from-blue-300 hover:to-blue-500 transition-all duration-300 transform hover:scale-105"
        >
          Hindi
        </button>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="bg-blue-200 p-4 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            {t("dos-title")}
          </h3>
          <ul className="text-gray-700">
            <li>☞ {t("flood-dos-1")}</li>
            <li>☞ {t("flood-dos-2")}</li>
            <li>☞ {t("flood-dos-3")}</li>
          </ul>
        </div>
        <div className="bg-blue-200 p-4 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            {t("donts-title")}
          </h3>
          <ul className="text-gray-700">
            <li>☞ {t("flood-donts-1")}</li>
            <li>☞ {t("flood-donts-2")}</li>
            <li>☞ {t("flood-donts-3")}</li>
          </ul>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Flood Chronology in India
        </h2>
        <div className="w-full max-w-2xl mx-auto bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl shadow-lg border border-blue-300">
          <div className="w-full h-96">
            <Chart type="bar" data={floodData} options={options} />
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Additional Resources
        </h2>
        <ul className="list-disc pl-5 text-blue-700">
          <li>
            <a
              href="https://en.wikipedia.org/wiki/Floods_in_India"
              target="_blank"
              rel="noopener noreferrer"
            >
              Wikipedia - Floods in India
            </a>
          </li>
          <li>
            <a
              href="https://www.youtube.com/results?search_query=flood+safety+tips"
              target="_blank"
              rel="noopener noreferrer"
            >
              YouTube - Flood Safety Tips
            </a>
          </li>
          <li>
            <a
              href="https://www.google.com/search?q=Recent+articles+on+floods+in+India"
              target="_blank"
              rel="noopener noreferrer"
            >
              Article - Recent Articles on Floods in India
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Flood;

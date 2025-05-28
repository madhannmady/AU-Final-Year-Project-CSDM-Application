import { FaExclamationTriangle } from "react-icons/fa";
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

function Landslide() {
  const { t, i18n } = useTranslation();

  const landslideData = {
    labels: ["1998", "2013", "2014", "2021"],
    datasets: [
      {
        label: "Fatalities",
        data: [200, 500, 150, 100],
        backgroundColor: "rgba(245, 158, 11, 0.8)",
        borderColor: "rgba(245, 158, 11, 1)",
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
        text: "Landslide Chronology in India",
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
        <h1 className="text-4xl font-bold text-gray-800">Landslide</h1>
        <FaExclamationTriangle className="text-yellow-500 text-6xl" />
      </div>

      <div className="w-full h-48 mb-6 flex items-center justify-center">
        <img
          src="/public/landslide.jpg"
          alt="Kedarnath Landslide 2013"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Unveiling the Landslide Phenomenon
        </h2>
        <p className="text-gray-700 text-justify">
          A landslide is the rapid downward movement of rock, soil, and debris
          due to gravity, often triggered by heavy rainfall, earthquakes, or
          human activities like deforestation and construction. In India,
          landslides are a significant hazard, particularly in the Himalayan
          region, Western Ghats, and northeastern states, where steep slopes and
          monsoon rains create ideal conditions. The 2013 Uttarakhand floods and
          landslides, triggered by excessive rainfall, resulted in over 5,700
          deaths, making it one of the deadliest natural disasters in recent
          times. India’s vulnerability is compounded by unplanned development
          and poor drainage systems, necessitating robust early warning systems
          and sustainable land-use practices to reduce the impact on hilly
          communities.
        </p>
      </div>

      <div className="mb-6 flex justify-center space-x-4">
        <button
          onClick={() => changeLanguage("en")}
          className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white font-semibold rounded-lg shadow-md hover:from-yellow-500 hover:to-yellow-700 transition-all duration-300 transform hover:scale-105"
        >
          English
        </button>
        <button
          onClick={() => changeLanguage("ta")}
          className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white font-semibold rounded-lg shadow-md hover:from-yellow-500 hover:to-yellow-700 transition-all duration-300 transform hover:scale-105"
        >
          Tamil
        </button>
        <button
          onClick={() => changeLanguage("te")}
          className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white font-semibold rounded-lg shadow-md hover:from-yellow-500 hover:to-yellow-700 transition-all duration-300 transform hover:scale-105"
        >
          Telugu
        </button>
        <button
          onClick={() => changeLanguage("ml")}
          className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white font-semibold rounded-lg shadow-md hover:from-yellow-500 hover:to-yellow-700 transition-all duration-300 transform hover:scale-105"
        >
          Malayalam
        </button>
        <button
          onClick={() => changeLanguage("hi")}
          className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white font-semibold rounded-lg shadow-md hover:from-yellow-500 hover:to-yellow-700 transition-all duration-300 transform hover:scale-105"
        >
          Hindi
        </button>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="bg-yellow-100 p-4 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            {t("dos-title")}
          </h3>
          <ul className="text-gray-700">
            <li>☞ {t("landslide-dos-1")}</li>
            <li>☞ {t("landslide-dos-2")}</li>
            <li>☞ {t("landslide-dos-3")}</li>
          </ul>
        </div>
        <div className="bg-yellow-100 p-4 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            {t("donts-title")}
          </h3>
          <ul className="text-gray-700">
            <li>☞ {t("landslide-donts-1")}</li>
            <li>☞ {t("landslide-donts-2")}</li>
            <li>☞ {t("landslide-donts-3")}</li>
          </ul>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Landslide Chronology in India
        </h2>
        <div className="w-full max-w-2xl mx-auto bg-gradient-to-br from-yellow-50 to-white p-6 rounded-xl shadow-lg border border-yellow-300">
          <div className="w-full h-96">
            <Chart type="bar" data={landslideData} options={options} />
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Additional Resources
        </h2>
        <ul className="list-disc pl-5 text-yellow-500">
          <li>
            <a
              href="https://en.wikipedia.org/wiki/Landslides_in_India"
              target="_blank"
              rel="noopener noreferrer"
            >
              Wikipedia - Landslides in India
            </a>
          </li>
          <li>
            <a
              href="https://www.youtube.com/results?search_query=landslide+safety+tips"
              target="_blank"
              rel="noopener noreferrer"
            >
              YouTube - Landslide Safety Tips
            </a>
          </li>
          <li>
            <a
              href="https://www.google.com/search?q=Recent+articles+on+landslides+in+India"
              target="_blank"
              rel="noopener noreferrer"
            >
              Article - Recent Articles on Landslides in India
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Landslide;

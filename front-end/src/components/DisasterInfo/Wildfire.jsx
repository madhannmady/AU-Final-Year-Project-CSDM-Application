import { FaFire } from "react-icons/fa";
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

function Wildfire() {
  const { t, i18n } = useTranslation();

  const wildfireData = {
    labels: ["1995", "2003", "2016", "2019"],
    datasets: [
      {
        label: "Fatalities",
        data: [50, 30, 80, 20],
        backgroundColor: "rgba(239, 68, 68, 0.8)",
        borderColor: "rgba(239, 68, 68, 1)",
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
        text: "Wildfire Chronology in India",
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
        <h1 className="text-4xl font-bold text-gray-800">Wildfire</h1>
        <FaFire className="text-red-500 text-6xl" />
      </div>

      <div className="w-full h-48 mb-6 flex items-center justify-center">
        <img
          src="/public/wildfire.jpg"
          alt="Wildfire in India 2018"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Unveiling the Wildfire Phenomenon
        </h2>
        <p className="text-gray-700 text-justify">
          A wildfire is an uncontrolled fire that spreads rapidly through
          vegetation, such as forests, grasslands, and shrublands, fueled by dry
          conditions, strong winds, and human activities. In India, wildfires
          are a seasonal threat, particularly during the dry summer months from
          February to June, affecting regions like Uttarakhand, Himachal
          Pradesh, and the northeastern states. These fires are often triggered
          by natural causes like lightning or human negligence, such as
          agricultural burning or discarded cigarettes. The 2016 Uttarakhand
          wildfires, one of the most severe, burned over 4,000 hectares and
          claimed several lives, highlighting the need for better forest
          management. India’s diverse ecosystems and changing climate patterns,
          including rising temperatures, exacerbate the frequency and intensity
          of wildfires, posing risks to wildlife, local communities, and air
          quality.
        </p>
      </div>

      <div className="mb-6 flex justify-center space-x-4">
        <button
          onClick={() => changeLanguage("en")}
          className="px-6 py-3 bg-gradient-to-r from-red-400 to-red-600 text-white font-semibold rounded-lg shadow-md hover:from-red-500 hover:to-red-700 transition-all duration-300 transform hover:scale-105"
        >
          English
        </button>
        <button
          onClick={() => changeLanguage("ta")}
          className="px-6 py-3 bg-gradient-to-r from-red-400 to-red-600 text-white font-semibold rounded-lg shadow-md hover:from-red-500 hover:to-red-700 transition-all duration-300 transform hover:scale-105"
        >
          Tamil
        </button>
        <button
          onClick={() => changeLanguage("te")}
          className="px-6 py-3 bg-gradient-to-r from-red-400 to-red-600 text-white font-semibold rounded-lg shadow-md hover:from-red-500 hover:to-red-700 transition-all duration-300 transform hover:scale-105"
        >
          Telugu
        </button>
        <button
          onClick={() => changeLanguage("ml")}
          className="px-6 py-3 bg-gradient-to-r from-red-400 to-red-600 text-white font-semibold rounded-lg shadow-md hover:from-red-500 hover:to-red-700 transition-all duration-300 transform hover:scale-105"
        >
          Malayalam
        </button>
        <button
          onClick={() => changeLanguage("hi")}
          className="px-6 py-3 bg-gradient-to-r from-red-400 to-red-600 text-white font-semibold rounded-lg shadow-md hover:from-red-500 hover:to-red-700 transition-all duration-300 transform hover:scale-105"
        >
          Hindi
        </button>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="bg-red-100 p-4 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            {t("dos-title")}
          </h3>
          <ul className="text-gray-700">
            <li>☞ {t("wildfire-dos-1")}</li>
            <li>☞ {t("wildfire-dos-2")}</li>
            <li>☞ {t("wildfire-dos-3")}</li>
          </ul>
        </div>
        <div className="bg-red-100 p-4 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            {t("donts-title")}
          </h3>
          <ul className="text-gray-700">
            <li>☞ {t("wildfire-donts-1")}</li>
            <li>☞ {t("wildfire-donts-2")}</li>
            <li>☞ {t("wildfire-donts-3")}</li>
          </ul>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Wildfire Chronology in India
        </h2>
        <div className="w-full max-w-2xl mx-auto bg-gradient-to-br from-red-50 to-white p-6 rounded-xl shadow-lg border border-red-300">
          <div className="w-full h-96">
            <Chart type="bar" data={wildfireData} options={options} />
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Additional Resources
        </h2>
        <ul className="list-disc pl-5 text-red-500">
          <li>
            <a
              href="https://en.wikipedia.org/wiki/Wildfires_in_India"
              target="_blank"
              rel="noopener noreferrer"
            >
              Wikipedia - Wildfires in India
            </a>
          </li>
          <li>
            <a
              href="https://www.youtube.com/results?search_query=wildfire+safety+tips"
              target="_blank"
              rel="noopener noreferrer"
            >
              YouTube - Wildfire Safety Tips
            </a>
          </li>
          <li>
            <a
              href="https://www.google.com/search?q=Recent+articles+on+wildfires+in+India"
              target="_blank"
              rel="noopener noreferrer"
            >
              Article - Recent Articles on Wildfires in India
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Wildfire;

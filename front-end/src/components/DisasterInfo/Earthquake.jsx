import { FaGlobeAmericas } from "react-icons/fa";
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

function Earthquake() {
  const { t, i18n } = useTranslation();

  const earthquakeData = {
    labels: ["1803", "1869", "1897", "1950", "2001"],
    datasets: [
      {
        label: "Fatalities",
        data: [300, 200, 1542, 1500, 20026],
        backgroundColor: "rgba(74, 85, 104, 0.8)",
        borderColor: "rgba(74, 85, 104, 1)",
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
        text: "Earthquake Chronology in India",
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
        <h1 className="text-4xl font-bold text-gray-800">Earthquake</h1>
        <FaGlobeAmericas className="text-gray-700 text-6xl" />
      </div>

      <div className="w-full h-48 mb-6 flex items-center justify-center">
        <img
          src="/public/earthquake.jpg"
          alt="2001 Gujarat Earthquake damage"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Unveiling the Earthquake Phenomenon
        </h2>
        <p className="text-gray-700 text-justify">
          An earthquake is a sudden and violent shaking of the ground caused by
          the movement of tectonic plates beneath the Earth's surface. This
          natural phenomenon occurs when accumulated stress along fault lines is
          released, sending seismic waves that can cause widespread destruction.
          India, located on the Indian tectonic plate, experiences significant
          seismic activity, particularly in the Himalayan region and the
          northeastern states, where the plate collides with the Eurasian Plate.
          Notable events include the 1897 Assam earthquake (magnitude 8.0,
          ~1,542 deaths) and the 2001 Gujarat earthquake (magnitude 7.7, ~20,026
          deaths), one of the deadliest in recent history. The country's
          vulnerability is heightened by its dense population and poorly
          constructed buildings in seismic zones, making preparedness and
          resilient infrastructure critical to mitigating losses.
        </p>
      </div>

      <div className="mb-6 flex justify-center space-x-4">
        <button
          onClick={() => changeLanguage("en")}
          className="px-6 py-3 bg-gradient-to-r from-gray-400 to-gray-600 text-white font-semibold rounded-lg shadow-md hover:from-gray-500 hover:to-gray-700 transition-all duration-300 transform hover:scale-105"
        >
          English
        </button>
        <button
          onClick={() => changeLanguage("ta")}
          className="px-6 py-3 bg-gradient-to-r from-gray-400 to-gray-600 text-white font-semibold rounded-lg shadow-md hover:from-gray-500 hover:to-gray-700 transition-all duration-300 transform hover:scale-105"
        >
          Tamil
        </button>
        <button
          onClick={() => changeLanguage("te")}
          className="px-6 py-3 bg-gradient-to-r from-gray-400 to-gray-600 text-white font-semibold rounded-lg shadow-md hover:from-gray-500 hover:to-gray-700 transition-all duration-300 transform hover:scale-105"
        >
          Telugu
        </button>
        <button
          onClick={() => changeLanguage("ml")}
          className="px-6 py-3 bg-gradient-to-r from-gray-400 to-gray-600 text-white font-semibold rounded-lg shadow-md hover:from-gray-500 hover:to-gray-700 transition-all duration-300 transform hover:scale-105"
        >
          Malayalam
        </button>
        <button
          onClick={() => changeLanguage("hi")}
          className="px-6 py-3 bg-gradient-to-r from-gray-400 to-gray-600 text-white font-semibold rounded-lg shadow-md hover:from-gray-500 hover:to-gray-700 transition-all duration-300 transform hover:scale-105"
        >
          Hindi
        </button>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="bg-gray-200 p-4 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            {t("dos-title")}
          </h3>
          <ul className="text-gray-700">
            <li>☞ {t("earthquake-dos-1")}</li>
            <li>☞ {t("earthquake-dos-2")}</li>
            <li>☞ {t("earthquake-dos-3")}</li>
          </ul>
        </div>
        <div className="bg-gray-200 p-4 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            {t("donts-title")}
          </h3>
          <ul className="text-gray-700">
            <li>☞ {t("earthquake-donts-1")}</li>
            <li>☞ {t("earthquake-donts-2")}</li>
            <li>☞ {t("earthquake-donts-3")}</li>
          </ul>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Earthquake Chronology in India
        </h2>
        <div className="w-full max-w-2xl mx-auto bg-gradient-to-br from-gray-100 to-white p-6 rounded-xl shadow-lg border border-gray-300">
          <div className="w-full h-96">
            <Chart type="bar" data={earthquakeData} options={options} />
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Additional Resources
        </h2>
        <ul className="list-disc pl-5 text-gray-700">
          <li>
            <a
              href="https://en.wikipedia.org/wiki/2001_Gujarat_earthquake"
              target="_blank"
              rel="noopener noreferrer"
            >
              Wikipedia - 2001 Gujarat Earthquake
            </a>
          </li>
          <li>
            <a
              href="https://www.youtube.com/results?search_query=earthquake+safety+tips"
              target="_blank"
              rel="noopener noreferrer"
            >
              YouTube - Earthquake Safety Tips
            </a>
          </li>
          <li>
            <a
              href="https://www.google.com/search?q=Recent+articles+on+earthquakes+in+India"
              target="_blank"
              rel="noopener noreferrer"
            >
              Article: Recent Articles on Earthquakes in India
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Earthquake;

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { FaShieldAlt } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { name: "Home", url: "/app/home" },
    { name: "Admin", url: "/app/admin" },
    { name: "Community Forum", url: "/app/community-forum" },
    { name: "Disaster Info", url: "/app/disaster-info" },
    { name: "Weather-Forecast", url: "/app/weather-forecast" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50 border-b-2 border-blue-500">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <FaShieldAlt className="text-blue-500 w-8 h-8 animate-pulse" />
            <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-wide">
              Crisis Connect
            </h1>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {menuItems.map((item, index) => (
              <motion.div key={index} whileHover={{ scale: 1.05 }}>
                <Link
                  to={item.url}
                  className={`relative text-lg font-medium transition duration-300 ${
                    location.pathname === item.url
                      ? "text-blue-500"
                      : "text-gray-700 hover:text-blue-500"
                  }`}
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="focus:outline-none text-gray-900"
            >
              {isOpen ? (
                <X className="w-8 h-8" />
              ) : (
                <Menu className="w-8 h-8" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-white py-4 border-t-2 border-red-500 shadow-lg"
          >
            {menuItems.map((item, index) => (
              <Link
                key={index}
                to={item.url}
                className="block py-3 px-6 text-center text-gray-900 text-lg font-medium hover:bg-red-500 hover:text-white transition duration-300"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

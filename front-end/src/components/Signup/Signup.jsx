import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Use environment variable for API URL, fallback to ngrok or localhost
  const API_URL =
    import.meta.env.REACT_APP_API_URL ||
    import.meta.env.REACT_APP_NGROK_URL ||
    "http://localhost:5000/api/user/signup";

  useEffect(() => {
    const isSignedUp = localStorage.getItem("isSignedUp");
    if (isSignedUp === "true") {
      navigate("/app/home");
    }
  }, [navigate]);

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!name.trim() || !phoneNumber.trim()) {
      setMessage("Name and phone number are required");
      return;
    }
    const phoneRegex = /^[0-9]{10}$/; // Basic 10-digit validation
    if (!phoneRegex.test(phoneNumber.trim())) {
      setMessage("Please enter a valid 10-digit phone number");
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*", // Temporary for testing
        },
        body: JSON.stringify({
          name: name.trim(),
          phoneNumber: phoneNumber.trim(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${
            errorData.message || "Unknown error"
          }`
        );
      }

      const result = await response.json();
      if (result.success) {
        localStorage.setItem("isSignedUp", "true");
        localStorage.setItem("phoneNumber", phoneNumber.trim());
        localStorage.setItem("name", name.trim());
        console.log(
          "Signup successful, stored name:",
          name.trim(),
          "phoneNumber:",
          phoneNumber.trim()
        );
        setMessage("Data submitted successfully! Redirecting...");
        setTimeout(() => navigate("/app/home"), 2000);
      } else {
        setMessage(result.message || "Submission failed");
        console.error("Signup failed:", result.message);
      }
    } catch (error) {
      console.error("Error during submission:", error);
      setMessage(
        `An error occurred. Details: ${error.message}. Check server logs or network connection.`
      );
      // Retry logic for network errors
      if (
        error.message.includes("timeout") ||
        error.message.includes("network")
      ) {
        setMessage("Network issue detected. Retrying...");
        setTimeout(handleSignup, 3000); // Retry after 3 seconds
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Welcome! Enter Your Details
        </h2>
        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Phone Number</label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
          >
            Submit
          </button>
        </form>
        {message && <p className="mt-4 text-center text-red-500">{message}</p>}
      </div>
    </div>
  );
}

export default Signup;

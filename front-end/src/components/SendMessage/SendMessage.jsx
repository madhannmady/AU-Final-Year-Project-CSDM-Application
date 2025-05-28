import { useState } from "react";

function SendMessage() {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const phoneNumber = localStorage.getItem("phoneNumber");

  // Use environment variable for API URL, fallback to ngrok or localhost
  const API_URL =
    import.meta.env.REACT_APP_API_URL ||
    import.meta.env.REACT_APP_NGROK_URL ||
    "http://localhost:5000/send-sms";

  const handleSendSMS = async (e) => {
    e.preventDefault();
    if (!message.trim()) {
      setStatus("Message is required");
      return;
    }
    if (!phoneNumber) {
      setStatus("Phone number not found. Please sign up again.");
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
          message: message.trim(),
          to: phoneNumber.trim(),
        }),
      });

      const result = await response.json();
      if (result.success) {
        setStatus("SMS sent successfully!");
        setMessage("");
      } else {
        setStatus(result.message || "Failed to send SMS");
      }
    } catch (error) {
      console.error("Error sending SMS:", error);
      setStatus(`Failed to send SMS: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Send SMS
        </h2>
        <form onSubmit={handleSendSMS} className="space-y-4">
          <div>
            <label className="block text-gray-700">Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-2 border rounded"
              rows="4"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">To</label>
            <input
              type="text"
              value={phoneNumber || "No phone number found"}
              readOnly
              className="w-full p-2 border rounded bg-gray-100"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Send SMS
          </button>
        </form>
        {status && <p className="mt-4 text-center text-red-500">{status}</p>}
      </div>
    </div>
  );
}

export default SendMessage;

import React, { useState } from "react";
import axios from "axios";

const Chatbot = () => {
  const [message, setMessage] = useState("");
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("/api/chatbot", { message });
      setResponses([...responses, { user: message, bot: response.data.reply }]);
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-0 right-0 m-4 p-4 bg-white shadow-lg rounded-lg w-80">
      <div className="flex flex-col h-80">
        <div className="flex-1 overflow-y-auto p-2 border border-gray-300 rounded-md">
          {responses.map((resp, index) => (
            <div key={index} className="mb-2">
              <p className="font-bold">You:</p>
              <p>{resp.user}</p>
              <p className="font-bold">Bot:</p>
              <p>{resp.bot}</p>
            </div>
          ))}
          {loading && <p className="text-gray-500">Typing...</p>}
        </div>
        <form onSubmit={handleSubmit} className="flex mt-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 p-2 border border-gray-300 rounded-l-md"
            placeholder="Type your message..."
          />
          <button
            type="submit"
            className="p-2 bg-blue-500 text-white rounded-r-md"
            disabled={loading}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chatbot;

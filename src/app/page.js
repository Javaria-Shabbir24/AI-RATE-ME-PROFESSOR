"use client";

import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [previousMessages, setPreviousMessages] = useState(new Set());

  const sendMessage = async (e) => {
    e.preventDefault();

    if (!message) return;

    const newMessage = { user: "You", text: message };
    setChatHistory((prevChatHistory) => [...prevChatHistory, newMessage]);
    setLoading(true);

    try {
      // Check if the message was previously sent
      if (!previousMessages.has(message)) {
        const response = await axios.post("/api/chatbot", { message });

        // Add the message to the set of previous messages
        setPreviousMessages((prevMessages) => new Set(prevMessages).add(message));

        setChatHistory((prevChatHistory) => [
          ...prevChatHistory,
          { user: "Bot", text: response.data.reply },
        ]);
      } else {
        setChatHistory((prevChatHistory) => [
          ...prevChatHistory,
          { user: "Bot", text: "You have already asked this question." },
        ]);
      }
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
      setChatHistory((prevChatHistory) => [
        ...prevChatHistory,
        { user: "Bot", text: "Sorry, something went wrong!" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto", backgroundColor: "pink" }}>
      <h1 style={{ textAlign: "center", fontSize: "40px", color: "black" }}>Rate my Professor Chatbot</h1>
      <div
        style={{
          border: "1px solid #ccc",
          padding: "10px",
          height: "400px",
          overflowY: "scroll",
          marginBottom: "10px",
          backgroundColor: "lightblue",
          color: "black"
        }}
      >
        {chatHistory.map((chat, index) => (
          <p key={index}>
            <strong>{chat.user}:</strong> {chat.text}
          </p>
        ))}
      </div>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          style={{ width: "80%", padding: "10px" }}
          disabled={loading}
        />
        <button
          type="submit"
          style={{ padding: "10px", marginLeft: "10px" }}
          disabled={loading}
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </form>
    </div>
  );
}

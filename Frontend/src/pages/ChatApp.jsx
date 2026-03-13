import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

function ChatApp({ user }) {

  const [users, setUsers] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");

  // Load users from backend
  const loadUsers = async () => {
    try {

      const res = await fetch("http://localhost:5000/api/users");
      const data = await res.json();

      setUsers(data);

    } catch (error) {
      console.error("User load error:", error);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // Join socket room
  useEffect(() => {

    if (user) {

      socket.emit("join", {
        userId: user.anonymousId
      });

      console.log("Joined socket room:", user.anonymousId);

    }

  }, [user]);

  // Receive messages
  useEffect(() => {

    socket.on("receive_message", (data) => {

      const newMessage = {
        id: Date.now(),
        text: data.message,
        timestamp: new Date().toLocaleTimeString(),
        blockchainHash: data.tx_hash,
        isMine: false
      };

      setMessages(prev => [...prev, newMessage]);

    });

    return () => socket.off("receive_message");

  }, []);

  // Send message
  const sendMessage = async () => {

    if (!inputMessage || !selectedContact) return;

    try {

      const response = await fetch("http://localhost:5000/api/send-message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          sender: user.anonymousId,
          receiver: selectedContact.anonymousId,
          message: inputMessage
        })
      });

      const data = await response.json();

      const newMessage = {
        id: Date.now(),
        text: inputMessage,
        timestamp: new Date().toLocaleTimeString(),
        blockchainHash: data.tx_hash,
        isMine: true
      };

      setMessages(prev => [...prev, newMessage]);

      setInputMessage("");

    } catch (error) {
      console.error("Send message error:", error);
    }
  };

  return (

    <div style={{ display: "flex", height: "100vh" }}>

      {/* CONTACT LIST */}
      <div style={{ width: "30%", borderRight: "1px solid #ccc", padding: 20 }}>

        <h2>Contacts</h2>

        {users.map(u => (

          <div
            key={u.anonymousId}
            onClick={() => {
              setSelectedContact(u);
              setMessages([]);
            }}
            style={{
              padding: 10,
              cursor: "pointer",
              background:
                selectedContact?.anonymousId === u.anonymousId
                  ? "#eee"
                  : "transparent"
            }}
          >
            {u.displayName}
          </div>

        ))}

      </div>

      {/* CHAT AREA */}
      <div style={{ flex: 1, padding: 20, display: "flex", flexDirection: "column" }}>

        <h2>
          {selectedContact
            ? `Chat with ${selectedContact.displayName}`
            : "Select a contact"}
        </h2>

        {/* MESSAGES */}
        <div style={{ flex: 1, overflowY: "auto", marginBottom: 10 }}>

          {messages.map(msg => (

            <div
              key={msg.id}
              style={{
                textAlign: msg.isMine ? "right" : "left",
                marginBottom: 10
              }}
            >
              <div
                style={{
                  display: "inline-block",
                  padding: 10,
                  borderRadius: 10,
                  background: msg.isMine ? "#a0e7a0" : "#ddd"
                }}
              >
                {msg.text}
              </div>

              <div style={{ fontSize: 12 }}>
                {msg.timestamp}
              </div>

            </div>

          ))}

        </div>

        {/* MESSAGE INPUT */}
        {selectedContact && (

          <div style={{ display: "flex", gap: 10 }}>

            <input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type a message..."
              style={{ flex: 1, padding: 10 }}
            />

            <button onClick={sendMessage}>
              Send
            </button>

          </div>

        )}

      </div>

    </div>

  );
}

export default ChatApp;


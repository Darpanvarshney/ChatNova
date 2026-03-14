import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import "./ChatApp.css";

function ChatApp({ user }) {
  const [socket, setSocket] = useState(null);
  const [users, setUsers] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  // Map of contactId -> messages[]
  const [conversationMap, setConversationMap] = useState({});
  const [inputMessage, setInputMessage] = useState("");
  const userRef = useRef(user);

  useEffect(() => { userRef.current = user; }, [user]);

  useEffect(() => {
    const s = io("http://localhost:5000");
    setSocket(s);
    return () => s.disconnect();
  }, []);

  const loadUsers = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/users");
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error("User load error:", err);
    }
  };

  useEffect(() => {
    loadUsers();
    // Poll every 5s so newly registered users appear in contacts
    const interval = setInterval(loadUsers, 5000);
    return () => clearInterval(interval);
  }, []);

  // Join room whenever socket or user becomes available
  useEffect(() => {
    if (!socket || !user) return;
    socket.emit("join", { userId: user.anonymousId });
    console.log("[socket] joined room:", user.anonymousId);
  }, [socket, user]);

  // Register receive_message listener once on socket connect
  useEffect(() => {
    if (!socket) return;

    const handleReceive = (data) => {
      const me = userRef.current;
      console.log("[socket] receive_message", data, "me:", me?.anonymousId);
      if (!me) return;

      const contactId =
        data.sender === me.anonymousId ? data.receiver : data.sender;

      const newMsg = {
        id: `${Date.now()}-${Math.random()}`,
        text: data.message,
        timestamp: new Date().toLocaleTimeString(),
        isMine: data.sender === me.anonymousId,
      };

      setConversationMap((prev) => ({
        ...prev,
        [contactId]: [...(prev[contactId] || []), newMsg],
      }));
    };

    socket.on("receive_message", handleReceive);

    // Instantly add new users to contacts list when they register
    socket.on("user_joined", (newUser) => {
      setUsers((prev) => {
        if (prev.find((u) => u.anonymousId === newUser.anonymousId)) return prev;
        return [...prev, newUser];
      });
    });

    return () => {
      socket.off("receive_message", handleReceive);
      socket.off("user_joined");
    };
  }, [socket]);

  const contacts = users.filter((u) => u.anonymousId !== user?.anonymousId);

  // Messages for the currently selected conversation
  const messages = selectedContact
    ? conversationMap[selectedContact.anonymousId] || []
    : [];

  const sendMessage = async () => {
    if (!inputMessage || !selectedContact) return;

    const optimisticMsg = {
      id: `${Date.now()}-${Math.random()}`,
      text: inputMessage,
      timestamp: new Date().toLocaleTimeString(),
      isMine: true,
    };

    // Add optimistically to sender's conversation
    setConversationMap((prev) => ({
      ...prev,
      [selectedContact.anonymousId]: [
        ...(prev[selectedContact.anonymousId] || []),
        optimisticMsg,
      ],
    }));

    setInputMessage("");

    try {
      await fetch("http://localhost:5000/api/send-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sender: user.anonymousId,
          receiver: selectedContact.anonymousId,
          message: inputMessage,
        }),
      });
    } catch (err) {
      console.error("Send message error:", err);
    }
  };

  return (
    <div className="chat-app">
      <div className="chat-sidebar">
        <div className="sidebar-header">
          <div className="user-profile">
            <div className="user-avatar">{user?.displayName?.[0] || "A"}</div>
            <div className="user-info">
              <div className="user-name">{user?.displayName || "Anonymous"}</div>
              <div className="user-id">{user?.anonymousId || "anon"}</div>
            </div>
          </div>
          <button className="logout-btn" onClick={() => window.location.reload()}>⇦</button>
        </div>

        <div className="contacts-list">
          <div className="contacts-header">
            <h3>Contacts</h3>
            <div className="contact-count">{contacts.length}</div>
          </div>
          {contacts.length === 0 ? (
            <div className="empty-state">No contacts yet.</div>
          ) : (
            contacts.map((u) => (
              <div
                key={u.anonymousId}
                className={`contact-item ${selectedContact?.anonymousId === u.anonymousId ? "active" : ""}`}
                onClick={() => setSelectedContact(u)}
              >
                <div className="contact-avatar">{u.displayName?.[0] || "U"}</div>
                <div className="contact-info">
                  <div className="contact-name">{u.displayName}</div>
                  <div className="contact-id">{u.anonymousId}</div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="chat-main">
        <div className="chat-header">
          <div className="chat-contact-info">
            <div className="contact-avatar large">{selectedContact?.displayName?.[0] || "?"}</div>
            <div>
              <h3>{selectedContact?.displayName || "Select a contact"}</h3>
              <p className="contact-status">{selectedContact ? "Online" : "No conversation selected"}</p>
            </div>
          </div>
          <div className="encryption-badge">Encrypted</div>
        </div>

        <div className="messages-container">
          {selectedContact ? (
            messages.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">💬</div>
                <p>No messages yet. Start the conversation.</p>
              </div>
            ) : (
              messages.map((msg) => (
                <div key={msg.id} className={`message ${msg.isMine ? "mine" : "theirs"}`}>
                  <div className="message-content">
                    <p>{msg.text}</p>
                    <div className="message-meta">
                      <span>{msg.timestamp}</span>
                    </div>
                  </div>
                </div>
              ))
            )
          ) : (
            <div className="empty-state">
              <div className="empty-icon">👋</div>
              <p>Select a contact to start chatting.</p>
            </div>
          )}
        </div>

        <div className="message-input-container">
          <input
            className="message-input"
            placeholder={selectedContact ? "Type your message..." : "Select a contact first"}
            disabled={!selectedContact}
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") sendMessage(); }}
          />
          <button className="send-btn" onClick={sendMessage} disabled={!selectedContact}>
            ➤
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatApp;

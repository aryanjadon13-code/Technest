import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";
import { db } from "../Firebase";
import {
  doc,
  getDoc,
  setDoc,
  collection,
  addDoc,
  onSnapshot,
  serverTimestamp,
  orderBy,
  query,
} from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

function ChatPage() {
  const { productId } = useParams();
  const { user, loading: authLoading } = useAuth();

  const [product, setProduct] = useState(null);
  const [chatId, setChatId] = useState("");
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  // Smooth scroll to bottom on new message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, [messages]);

  // --- AUTH LOADING FIX ---
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-700 text-lg">Loading chat...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-700 text-lg">
          Please log in to access chat.
        </p>
      </div>
    );
  }

  // --- CHAT INITIALIZATION ---
  useEffect(() => {
    const init = async () => {
      try {
        // 1️⃣ Fetch product
        const productRef = doc(db, "products", productId);
        const snap = await getDoc(productRef);

        if (!snap.exists()) {
          console.error("❌ Product not found");
          return;
        }

        const p = snap.data();
        setProduct({ id: snap.id, ...p });

        // 2️⃣ Build a stable chatId
        const buyerUid = user.uid;
        const sellerUid = p.sellerUid; // MUST be stored in Sell.jsx

        const id = `${productId}__${sellerUid}__${buyerUid}`;
        setChatId(id);

        // 3️⃣ Create chat doc if not exists
        const chatRef = doc(db, "chats", id);
        const chatSnap = await getDoc(chatRef);

        if (!chatSnap.exists()) {
          await setDoc(chatRef, {
            productId,
            productTitle: p.title,
            buyerUid,
            buyerEmail: user.email,
            sellerUid,
            sellerEmail: p.sellerEmail,
            createdAt: serverTimestamp(),
            lastMessage: "",
            lastMessageAt: serverTimestamp(),
          });
        }

        // 4️⃣ Listen for messages
        const msgRef = collection(db, "chats", id, "messages");
        const q = query(msgRef, orderBy("createdAt", "asc"));

        const unsub = onSnapshot(q, (snapshot) => {
          const msgs = snapshot.docs.map((d) => ({
            id: d.id,
            ...d.data(),
          }));
          setMessages(msgs);
        });

        return () => unsub();
      } catch (err) {
        console.error("🔥 Chat initialization error:", err);
      }
    };

    init();
  }, [productId, user]);

  // --- SEND MESSAGE ---
  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || !chatId) return;

    try {
      const messagesRef = collection(db, "chats", chatId, "messages");

      await addDoc(messagesRef, {
        senderId: user.uid,
        senderEmail: user.email,
        text: input.trim(),
        createdAt: serverTimestamp(),
      });

      // Update chat preview
      await setDoc(
        doc(db, "chats", chatId),
        {
          lastMessage: input.trim(),
          lastMessageAt: serverTimestamp(),
        },
        { merge: true }
      );

      setInput("");
    } catch (err) {
      console.error("❌ Error sending message:", err);
      alert("Failed to send message.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <div className="flex-1 max-w-4xl w-full mx-auto px-4 py-4 flex flex-col">

        {/* Chat Header */}
        <div className="bg-white shadow rounded-lg px-4 py-3 mb-4">
          <h2 className="text-lg font-semibold">
            Chat about:
            <span className="text-indigo-600 ml-2">
              {product?.title}
            </span>
          </h2>
          <p className="text-sm text-gray-600">
            Seller: {product?.sellerEmail}
          </p>
        </div>

        {/* Messages Window */}
        <div className="flex-1 bg-white rounded-lg shadow p-4 overflow-y-auto mb-4">
          {messages.length === 0 ? (
            <p className="text-gray-500 text-center">
              No messages yet. Start the conversation!
            </p>
          ) : (
            messages.map((msg) => {
              const isMe = msg.senderId === user.uid;
              return (
                <div
                  key={msg.id}
                  className={`flex mb-2 ${
                    isMe ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[70%] px-3 py-2 rounded-lg text-sm ${
                      isMe
                        ? "bg-indigo-600 text-white rounded-br-none"
                        : "bg-gray-200 text-gray-800 rounded-bl-none"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              );
            })
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Box */}
        <form
          onSubmit={handleSend}
          className="flex items-center bg-white rounded-lg shadow px-3 py-2"
        >
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 border-none focus:outline-none px-2 py-2 text-sm"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <button
            type="submit"
            className="ml-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChatPage;

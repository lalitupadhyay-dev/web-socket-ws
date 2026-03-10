import { useEffect, useRef, useState } from 'react';
import './App.css'

function App() {

  const [socket, setSocket] = useState<null | WebSocket>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080");

    socket.onopen = () => {
      console.log("Connected");
      setSocket(socket);
    }

    socket.onmessage = (message) => {
      console.log("Received message: ", message.data);
      setMessages((messages) => [...messages, message.data])
    }

  }, []);

  if (!socket) return <div>Connecting to Socket Server...</div>

  return (
    <section style={{ display: "flex", flexDirection: "column" }}>
      Connected!
      <input ref={inputRef} type="text" placeholder="Enter the message" style={{ padding: "1rem" }} />
      <button onClick={() => {
        const msg = inputRef.current?.value;
        if (msg) {
          socket.send(msg);
        }
      }}>Send!</button>

      <div>
        <h3>All Messages</h3>
        <div>
          {
            messages.length > 0 ? messages.map((msg, i) => <div>{`${i + 1}. ${msg}`}</div>) : <span>No Message</span>
          }
        </div>
      </div>

    </section>
  );
}

export default App

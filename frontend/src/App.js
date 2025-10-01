import { useState } from 'react';

function App() {
  const [message, setMessage] = useState("");

  const fetchMessage = async () => {
    const res = await fetch("http://127.0.0.1:8000/test");
    const data = await res.json();
    setMessage(data.message);
  };

  return (
    <div className="App">
      <h1>Moodify Test</h1>
      <button onClick={fetchMessage}>Test Backend</button>
      <p>{message}</p>
    </div>
  );
}

export default App;

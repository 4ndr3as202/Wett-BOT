import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [tipps, setTipps] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/tipps')
      .then(res => res.json())
      .then(data => setTipps(data))
      .catch(err => console.error('Fehler beim Laden:', err));
  }, []);

  return (
    <div className="App">
      <h1>⚽ WettBot – Spieltipps</h1>
      {tipps.length === 0 ? (
        <p>⏳ Lade Spiele...</p>
      ) : (
        <ul>
          {tipps.map((spiel, index) => (
            <li key={index} style={{ marginBottom: '1em', textAlign: 'left' }}>
              <strong>{spiel.team1} vs {spiel.team2}</strong><br />
              🧠 <em>{spiel.tendenz}</em><br />
              💡 {spiel.empfehlung}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;

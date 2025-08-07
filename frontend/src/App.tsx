import { useState } from 'react'

function App() {
  const [showModal, setShowModal] = useState(false);
  const [player, setPlayer] = useState<any>(null);

  const unlockCoach = async () => {
    try {
      const res = await fetch('http://localhost:3001/api/unlock', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          playerId: '1',
          coachId: 'coach1',
        }),
      });

      if (!res.ok) {
        throw new Error('Unlock failed');
      }
      const data = await res.json();
      setPlayer(data.player);

      if (data.redFlag) {
        setShowModal(true);
      }
    } catch (err) {
      alert('Unlock failed.');
    }
  };

  return (
    <div>
      <h2>Unlock Coach</h2>
      <button onClick={unlockCoach}>Unlock Coach</button>

      {showModal && (
        <div style={{ border: '1px solid red', padding: 10 }}>
          Red flag
          <button onClick={() => setShowModal(false)}>Close</button>
        </div>
      )}

      {player && (
        <div>
          <p>XP: {player.xp}</p>
          <p>Tokens: {player.tokens}</p>
        </div>
      )}
    </div>
  );
}

export default App

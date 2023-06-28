import React, { useState, useEffect } from 'react';
import './App.css';
import idleSprite from './sprites/edle_0.png';
import walkSprite1 from './sprites/walk_0.png';
import walkSprite2 from './sprites/walk_2.png';

function App() {
  const [isWalking, setIsWalking] = useState(false);
  const [position, setPosition] = useState(0);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowRight') {
        setIsWalking(true);
      }
    };

    const handleKeyUp = (event) => {
      if (event.key === 'ArrowRight') {
        setIsWalking(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useEffect(() => {
    let intervalId;

    if (isWalking) {
      intervalId = setInterval(() => {
        setPosition((prevPosition) => prevPosition + 10);
        setStep((prevStep) => (prevStep === 0 ? 1 : 0));
      }, 200);
    } else {
      setPosition(0);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isWalking]);

  return (
    <div className="App">
      <h1>Castlevania: Symphony of the Night</h1>
      <div
        className={`character ${isWalking ? 'walk' : ''}`}
        style={{ left: position }}
      >
        <img
          src={isWalking ? (step === 0 ? walkSprite1 : walkSprite2) : idleSprite}
          alt="Character"
        />
      </div>
    </div>
  );
}

export default App;

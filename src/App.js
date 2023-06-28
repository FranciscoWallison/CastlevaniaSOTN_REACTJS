import React, { useState, useEffect } from 'react';
import './App.css';
import idleSprite1 from './sprites/idle1.png';
import idleSprite2 from './sprites/idle2.png';
import idleSprite3 from './sprites/idle3.png';
import idleSprite4 from './sprites/idle4.png';
import idleSprite5 from './sprites/idle5.png';
import idleSprite6 from './sprites/idle6.png';
import idleSprite7 from './sprites/idle7.png';
import walkSprite1 from './sprites/walk1.png';
import walkSprite2 from './sprites/walk2.png';

function App() {
  const [isWalking, setIsWalking] = useState(false);
  const [position, setPosition] = useState(0);
  const [idleFrame, setIdleFrame] = useState(1);
  // puxa de volta
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

  useEffect(() => {
    let intervalId;

    if (!isWalking) {
      intervalId = setInterval(() => {
        setIdleFrame((prevFrame) => {
          if (prevFrame === 7) {
            return 1;
          } else {
            return prevFrame + 1;
          }
        });
      }, 200);
    } else {
      setIdleFrame(1);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isWalking]);

  const getIdleSprite = () => {
    switch (idleFrame) {
      case 1:
        return idleSprite1;
      case 2:
        return idleSprite2;
      case 3:
        return idleSprite3;
      case 4:
        return idleSprite4;
      case 5:
        return idleSprite5;
      case 6:
        return idleSprite6;
      case 7:
        return idleSprite7;
      default:
        return idleSprite1;
    }
  };

  return (
    <div className="App">
      <h1>Castlevania: Symphony of the Night</h1>
      <div
        className={`character ${isWalking ? 'walk' : ''}`}
        style={{ left: position }}
      >
        <img
          src={isWalking ? (step === 0 ? walkSprite1 : walkSprite2) : getIdleSprite()}
          alt="Character"
        />
      </div>
    </div>
  );
}

export default App;

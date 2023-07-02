import React, { useState, useEffect } from 'react';
import './App.css';
import idleSprite1 from './sprites/idle_1.png';
import idleSprite2 from './sprites/idle_2.png';
import idleSprite3 from './sprites/idle_3.png';
import idleSprite4 from './sprites/idle_4.png';
import idleSprite5 from './sprites/idle_5.png';
import idleSprite6 from './sprites/idle_6.png';
import idleSprite7 from './sprites/idle_7.png';

import walkSprite1 from './sprites/walk_1.png';
import walkSprite2 from './sprites/walk_2.png';
import walkSprite3 from './sprites/walk_3.png';
import walkSprite4 from './sprites/walk_4.png';
import walkSprite5 from './sprites/walk_5.png';
import walkSprite6 from './sprites/walk_6.png';
import walkSprite7 from './sprites/walk_7.png';
import walkSprite8 from './sprites/walk_8.png';

import walkSprite9 from './sprites/walk2_1.png';
import walkSprite10 from './sprites/walk2_2.png';
import walkSprite11 from './sprites/walk2_3.png';
import walkSprite12 from './sprites/walk2_4.png';
import walkSprite13 from './sprites/walk2_5.png';
import walkSprite14 from './sprites/walk2_6.png';

import walkSprite15 from './sprites/walk3_1.png';
import walkSprite16 from './sprites/walk3_2.png';
import walkSprite17 from './sprites/walk3_3.png';
import walkSprite18 from './sprites/walk3_4.png';
import walkSprite19 from './sprites/walk3_5.png';
import walkSprite20 from './sprites/walk3_6.png';
import walkSprite21 from './sprites/walk3_7.png';
import walkSprite22 from './sprites/walk3_8.png';

import walkSprite23 from './sprites/walk4_1.png';
import walkSprite24 from './sprites/walk4_2.png';
import walkSprite25 from './sprites/walk4_3.png';
import walkSprite26 from './sprites/walk4_4.png';
import walkSprite27 from './sprites/walk4_5.png';
import walkSprite28 from './sprites/walk4_6.png';
import walkSprite29 from './sprites/walk4_7.png';

import walkSprite30 from './sprites/walk5_1.png';
import walkSprite31 from './sprites/walk5_2.png';

function App() {
  const [isWalking, setIsWalking] = useState(false);
  const [position, setPosition] = useState(0);
  const [idleFrame, setIdleFrame] = useState(1);
  const [walkFrame, setWalkFrame] = useState(1);
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

        setWalkFrame((prevFrame) => {
          console.log("setWalkFrame: ", prevFrame)
          if (prevFrame === 31) {
            return 16; // Retorna ao sprite 23 ao terminar o ciclo de animação
          } else {
            return prevFrame + 1;
          }
        });
        
        setStep((prevStep) => (prevStep === 0 ? 1 : 0));
      }, 200); // Intervalo padrão de 200ms
      // Acelera a animação dos sprites 1 a 15
      if (walkFrame >= 1 && walkFrame <= 15) {
        clearInterval(intervalId);
        intervalId = setInterval(() => {
          setPosition((prevPosition) => prevPosition + 10);
          setWalkFrame((prevFrame) => {
            if (prevFrame === 15) {
              return 1;
            } else {
              return prevFrame + 1;
            }
          });
        }, 100); // Intervalo menor de 100ms
      }
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

  const getWalkSprite = () => {
    switch (walkFrame) {
      case 1:
        return walkSprite1;
      case 2:
        return walkSprite2;
      case 3:
        return walkSprite3;
      case 4:
        return walkSprite4;
      case 5:
        return walkSprite5;
      case 6:
        return walkSprite6;
      case 7:
        return walkSprite7;
      case 8:
        return walkSprite8;
      case 9:
        return walkSprite9;
      case 10:
        return walkSprite10;
      case 11:
        return walkSprite11;
      case 12:
        return walkSprite12;
      case 13:
        return walkSprite13;
      case 14:
        return walkSprite14;
      case 15:
        return walkSprite15;
      case 16:
        return walkSprite16;
      case 17:
        return walkSprite17;
      case 18:
        return walkSprite18;
      case 19:
        return walkSprite19;
      case 20:
        return walkSprite20;
      case 21:
        return walkSprite21;
      case 22:
        return walkSprite22;
      case 23:
        return walkSprite23;
      case 24:
        return walkSprite24;
      case 25:
        return walkSprite25;
      case 26:
        return walkSprite26;
      case 27:
        return walkSprite27;
      case 28:
        return walkSprite28;
      case 29:
        return walkSprite29;
      case 30:
        return walkSprite30;
      case 31:
        return walkSprite31;
      // ... adicione os cases para os sprites walk4.png até walk31.png
      default:
        return walkSprite1;
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
          src={isWalking ? getWalkSprite() : getIdleSprite()}
          alt="Character"
        />
      </div>
    </div>
  );
}

export default App;

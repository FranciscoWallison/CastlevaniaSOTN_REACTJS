import React, { useState, useEffect } from 'react';
import './App.css';
import IdleSprite from './components/IdleSprite';
import StartWalkSprite from './components/StartWalkSprite';
import WalkSprite from './components/WalkSprite';



import spriteSheet from './sprites/character-sprite-sheet.png';

function App() {
  const [isIdle, setIsIdle] = useState(false);
  const [isStartWalking, setIsStartWalking] = useState(false);
  const [isWalking, setIsWalking] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false); // tem como objetivo espelhar
  
  const [position, setPosition] = useState(0);
  const spriteWidth = 114; // Largura de cada quadro do sprite
  const spriteHeight = 93; // Altura de cada quadro do sprite
  // 22 - 141 = 119
  // 141 - 260 = 119
  const framePositions = [22, 141, 260, 379, 498, 617]; // Posições dos quadros em pixels
  const framesPerRow = 17; // Quantidade de quadros por linha na folha de sprite
  const animationSpeed = 100; // Velocidade da transição entre os quadros em milissegundos

  // Standing - first animation (flat foot)
  // Em pé - primeira animação (pé plano)
  const inforIdleSprite = {
    spriteWidth,
    spriteHeight,
    framePositions,
    framesPerRow,
    animationSpeed,
    spriteSheet,
  }

  // Start walking
  // Comece a andar
  const inforStartWalkSprite = {
    spriteWidth,
    spriteHeight,
    framePositions: [22, 141, 260, 379, 498, 617, 736, 855, 974, 1093, 1212, 1331, 1450, 1569, 1688],
    framesPerRow: 116,
    animationSpeed: 70,
    spriteSheet
  }

  // Walk
  // Andar
  const inforWalkSprite = {
    spriteWidth,
    spriteHeight,
    framePositions: [22, 141, 260, 379, 498, 617, 736, 855, 974, 1093, 1212, 1331, 1450, 1569, 1688, 1807],
    framesPerRow: 215,
    animationSpeed: 70,
    spriteSheet
  }

  // Change side when walking
  // Mudar de lado ao caminhar
  

  useEffect(() => {
    const handleKeyDown = (event) => {

      if (event.key === 'ArrowRight') {
        // Para status parado
        setIsIdle(true);
        // Inicia status primeiros movimentos
        setIsStartWalking(false);

        // Mudando de posição
        setIsFlipped(false);
      } else if (event.key === 'ArrowLeft') {
        // Para status parado
        setIsIdle(true);
        // Inicia status primeiros movimentos
        setIsStartWalking(false);

        // Mudando de posição
        setIsFlipped(true);
      }

    };

    const handleKeyUp = (event) => {
      if (event.key === 'ArrowRight') {
        // Inicia status parado
        setIsIdle(false);
        // Para status primeiros movimentos
        setIsStartWalking(true)
        // Para status movimentos
        setIsWalking(false)

        // Mudando de posição
        setIsFlipped(false);
      } else if (event.key === 'ArrowLeft') {
        // Inicia status parado
        setIsIdle(false);
        // Para status primeiros movimentos
        setIsStartWalking(true)
        // Para status movimentos
        setIsWalking(false)

        // Mudando de posição
        setIsFlipped(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const validarStartWalk = () => {

    // Inicia caminhada
    setIsWalking(true)

    // Para start e parado
    setIsStartWalking(true)
    setIsIdle(true);
  }

  const getWalkSprite = () => {
    return <WalkSprite infor={inforWalkSprite} isWalking={isWalking}  validateMirrorMode={isFlipped} />;
  }

  const getStartWalkSprite = () => {
    return <StartWalkSprite infor={inforStartWalkSprite} isStartWalking={isStartWalking} validarStartWalk={validarStartWalk} validateMirrorMode={isFlipped}/>;
  }

  const getAlltWalking = () => {
    console.log("getAlltWalking: ", isWalking,isStartWalking)
    if (isWalking) {
      return getWalkSprite();
    }
    if (!isStartWalking) {
      return getStartWalkSprite()
    }
  }

  const getIdleSprite = () => {
    return <IdleSprite infor={inforIdleSprite} isIdle={isIdle} validateMirrorMode={isFlipped}/>;
  }

  return (
    <div className="App">
      <h1>Castlevania: Symphony of the Night</h1>
      <div
        className={`character ${isIdle ? 'walk' : ''}`}
        style={{ left: position }}
      >
        {isIdle ? getAlltWalking() : getIdleSprite()}
        {/* {getWalkSprite() } */}
        
      </div>
    </div>
  );
}

export default App;

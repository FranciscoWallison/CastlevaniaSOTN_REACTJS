import React, { useState, useEffect } from 'react';
import './App.css';
import IdleSprite from './components/IdleSprite';
import StartWalkSprite from './components/StartWalkSprite';
import WalkSprite from './components/WalkSprite';
import ChangeSideWhenWalkSprite from './components/ChangeSideWhenWalkSprite';


import spriteSheet from './sprites/character-sprite-sheet.png';

function App() {
  const [isIdle, setIsIdle] = useState(false);
  const [isStartWalking, setIsStartWalking] = useState(false);
  const [isWalking, setIsWalking] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false); // tem como objetivo espelhar

  // TESTES
  const [isSetas, setSetas] = useState("ArrowRight");
  const [isChangeSideWalking, setIsChangeSideWalking] = useState("ArrowLeft");

  // Dimensão do sprite na folha
  const spriteWidth = 110; // Largura de cada quadro do sprite
  const spriteHeight = 93; // Altura de cada quadro do sprite

  // diferença de 119
  const framePositions = [23, 142, 261, 380, 499, 618]; // Posições dos quadros em pixels
  // diferença de 99
  const framesPerRow = 17; // Quantidade de quadros por linha na folha de sprite
  const animationSpeed = 100; // Velocidade da transição entre os quadros em milissegundos

  // Transição de movimento
  // const walkAnimationSpeed = 100; // Velocidade da transição entre os quadros durante a caminhada
  // const flipAnimationSpeed = 300; // Velocidade da transição entre os quadros ao mudar de lado


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
    framePositions: [23, 142, 261, 380, 499, 618, 737, 856, 975, 1094, 1213, 1332, 1451, 1570, 1689],
    framesPerRow: 116,
    animationSpeed: 70,
    spriteSheet
  }

  // Walk
  // Andar
  const inforWalkSprite = {
    spriteWidth,
    spriteHeight,
    framePositions: [23, 142, 261, 380, 499, 618, 737, 856, 975, 1094, 1213, 1332, 1451, 1570, 1689, 1808],
    framesPerRow: 215,
    animationSpeed: 70,
    spriteSheet
  }

  // Change side when walking
  // Mudar de lado ao caminhar
  const inforChangeSideWhenWalkSprite = {
    spriteWidth,
    spriteHeight,
    framePositions: [23, 142, 261, 380, 499, 618, 737, 856, 975, 1094],
    framesPerRow: 314,
    animationSpeed: 100,
    spriteSheet,
    // walkAnimationSpeed,
    // flipAnimationSpeed
  }

  useEffect(() => {
    const handleKeyDown = (event) => {

      setSetas(event.key)
      
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

      setSetas(event.key)

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

  // Valida o movimento de iniciar a caminhada
  const validarStartWalk = () => {

    // Inicia caminhada
    setIsWalking(true)

    // Para start e parado
    setIsStartWalking(true)
    setIsIdle(true);

    setIsChangeSideWalking(isSetas);
  }

  const validarStartWalkAndChangeSideWhenWalk = () => {
    // 
    if (isSetas === "ArrowRight" && isChangeSideWalking === "ArrowLeft" ) {
      return true
    }
    // 
    if (isSetas === "ArrowLeft" && isChangeSideWalking === "ArrowRight" ) {
      return true
    }

    return false

  }

  const getChangeSideWhenWalkSprite = () => {
    return <ChangeSideWhenWalkSprite 
        infor={inforChangeSideWhenWalkSprite}
        validarStartWalk={validarStartWalk}
        isWalking={isWalking}
        validateMirrorMode={isFlipped} 
      />;
  }

  const getWalkSprite = () => {
    return <WalkSprite
      infor={inforWalkSprite}
      isWalking={isWalking} 
      validateMirrorMode={isFlipped}
    />;
  }

  const getStartWalkSprite = () => {
    return <StartWalkSprite infor={inforStartWalkSprite} isStartWalking={isStartWalking} validarStartWalk={validarStartWalk} validateMirrorMode={isFlipped}/>;
  }

  const getAlltWalking = () => {
    
    if (validarStartWalkAndChangeSideWhenWalk()) {
      console.log('====================================');
      console.log("validarStartWalkAndChangeSideWhenWalk: ", validarStartWalkAndChangeSideWhenWalk(), isSetas ,isChangeSideWalking);
      console.log('====================================');
      return getChangeSideWhenWalkSprite();
    }

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

  const getSetas = () => {
    console.log("getSetas: ", isSetas , isFlipped)
    switch (isSetas) {
      case "ArrowRight":
        return <div className="basket-right"></div>
      
      case "ArrowLeft":
        return <div className="basket-left"></div>
      
      case "ArrowUp":
        return <div className="basket-up"></div>
      
      case "ArrowDown":
        return <div className="basket-down"></div>
      
      default:
        return <div className="basket-right"></div>
      
    }
  }

  return (
    <div className="App">
      <h1>Castlevania: Symphony of the Night</h1>
      <div className="container"> 
        {getSetas()}
      </div>
     
      <div
        className={`container ${isIdle ? 'walk' : ''}`}
      >
        {isIdle ? getAlltWalking() : getIdleSprite()}
        {/* {getChangeSideWhenWalkSprite() } */}
        
      </div>
    </div>
  );
}

export default App;

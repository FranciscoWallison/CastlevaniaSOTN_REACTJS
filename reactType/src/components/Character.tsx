import React, { useState, useEffect } from 'react';
import idleSpriteSheet from './sprites/character-sprite-sheet.png'; // Importe a folha de sprite do Idle
import alucard from './infor/alucard.json';

type CharacterMovement = 'Idle' | 'StartWalk' | 'Walk' | 'ChangeSideWhenWalk';

const Character: React.FC = () => {
  const [movement, setMovement] = useState<CharacterMovement>('Idle');
  const [isFlipped, setIsFlipped] = useState<boolean>(false);


  // REFATORAR
  // Dimensão do sprite na folha
  const spriteWidth = 110; // Largura de cada quadro do sprite
  const spriteHeight = 93; // Altura de cada quadro do sprite

  const [frameIndex, setFrameIndex] = useState(0);

  // TESTES
  const [isSetas, setSetas] =  useState<string>('ArrowRight');

  useEffect(() => {

    const handleKeyDown = (event: KeyboardEvent) => {
    
      setSetas(event.key);
      // Verifique se o jogador pressionou a tecla para a esquerda ou direita
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        // Defina a direção correta e inicie a animação de mudança de lado
        setIsFlipped(event.key === 'ArrowRight');
        setMovement('ChangeSideWhenWalk');
      }else {
        setMovement('StartWalk');
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    let animationInterval: NodeJS.Timeout;

    // Lógica para controlar os movimentos do personagem
    switch (movement) {
      case 'Idle':
        // Lógica para o movimento Idle
        animationInterval = setInterval(() => {
          // Atualize a folha de sprite com a animação correspondente
          setFrameIndex((prevFrame) => {
            const nextIndex = prevFrame + 1;
            return nextIndex >= alucard[movement].framePositions.length ? 0 : nextIndex;          
          });
        }, alucard[movement].animationSpeed);
        break;
      case 'StartWalk':
        // Lógica para o movimento StartWalk
        animationInterval = setInterval(() => {
          setFrameIndex((prevFrame) => {
            const nextIndex = prevFrame + 1;
  
            if (nextIndex === alucard[movement].framePositions.length) {
              // A animação de StartWalk terminou, continue para o movimento Walk
              setMovement('Walk');
            }
  
            return nextIndex >= alucard[movement].framePositions.length ? 0 : nextIndex;
          });
        }, alucard[movement].animationSpeed);
        break;
      case 'Walk':
        // Lógica para o movimento Walk
        animationInterval = setInterval(() => {    
          setFrameIndex((prevFrame) => {
            console.log("Walk: ", prevFrame)
            const nextIndex = prevFrame + 1;
            return nextIndex >= alucard[movement].framePositions.length ? 0 : nextIndex;
          });
          
        }, alucard[movement].animationSpeed);
        break;
      case 'ChangeSideWhenWalk':
        animationInterval = setInterval(() => {
          setFrameIndex((prevFrame) => {
            const nextIndex = prevFrame + 1;
            console.log("ChangeSideWhenWalk: ", nextIndex ,alucard[movement].framePositions.length)
            if (nextIndex === alucard[movement].framePositions.length) {
              // A animação de ChangeSideWhenWalk terminou, volte para o movimento Walk
              setMovement('Walk');
            }
  
            return nextIndex >= alucard[movement].framePositions.length ? 0 : nextIndex;
          });
        }, alucard[movement].animationSpeed);
        
        break;
      default:
        break;
    }

    return () => {
      clearInterval(animationInterval);
    };
  }, [movement]);

  const getSetas = () => {
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

  const getIdleSprite = () => {

    // Organizando o erro de falha do quando quando muda de posição
    const validarCalculoEspelho = 
    isFlipped ? (alucard[movement].framePositions[frameIndex]+1) : alucard[movement].framePositions[frameIndex];
      
    // Posição X e Y da folha de Sprinte
    const backgroundPositionX = validarCalculoEspelho;
    const backgroundPositionY = alucard[movement].framesPerRow;    

    return {
      background: `url(${idleSpriteSheet})`,
      backgroundPosition: `-${backgroundPositionX}px -${backgroundPositionY}px`,
      width: `${spriteWidth}px`,
      height: `${spriteHeight}px`,
      transform: isFlipped ? 'scaleX(-1)' : 'scaleX(1)',
    };
};

  return (
    // Renderize o elemento do personagem com a folha de sprite animada
    // Utilize a propriedade isFlipped para definir a direção da animação
    <div>
        <h1>Castlevania: Symphony of the Night</h1>

        <div className="container"> 
            {getSetas()}
        </div>

        <div
            className={`container`}
        >
          <div>
            <div className="sprite" style={getIdleSprite()}></div>
          </div>        
        </div>
    </div>
    
  );
};

export default Character;

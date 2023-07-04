import React, { useState, useEffect } from 'react';
import idleSpriteSheet from './sprites/character-sprite-sheet.png'; // Importe a folha de sprite do Idle
import alucard from './infor/alucard.json';
import { type } from 'os';

type CharacterMovement = 'Idle' | 'StartWalk' | 'Walk' | 'ChangeSideWhenWalk';
type Direction = 'Right' | 'Left'


const Character: React.FC = () => {
  const [movement, setAnimation] = useState<CharacterMovement>('Idle');
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  // Adicione a seguinte variável de estado
  const [currentDirection, setCurrentDirection] = useState<Direction>('Right');
  // Adicione a variável de estado movementDirection
  // const [movementDirection, setAnimationDirection] = useState<Direction>('Right');

  // Rastrear o estado das teclas de direção
  const [isLeftPressed, setIsLeftPressed] = useState(false);
  const [isRightPressed, setIsRightPressed] = useState(false);
  // Adicione uma nova variável de estado para controlar se a animação "Walk" deve ser iniciada
  const [isWalking, setIsWalking] = useState(false);
  const [isStartWalk, setIsStartWalk] = useState(false);
  const [isChangeSideWhenWalk, setIsChangeSideWhenWalk] = useState(false);
  

  



  // REFATORAR
  // Dimensão do sprite na folha
  const spriteWidth = 110; // Largura de cada quadro do sprite
  const spriteHeight = 93; // Altura de cada quadro do sprite

  const [frameIndex, setFrameIndex] = useState(0);

  // TESTES
  const [isSetas, setSetas] =  useState<string>('ArrowRight');

  useEffect(() => {

     // pressionado
     const handleKeyDown = (event: KeyboardEvent) => {
      setSetas(event.key);
      // Verifique se o jogador pressionou a tecla para a esquerda ou direita
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        // Defina a direção correta e inicie a animação de mudança de lado
        setIsFlipped(event.key === 'ArrowLeft');
      }

      switch (event.key) {
        case 'ArrowLeft':
          // Logica para validar se ele mudou de posição
          if (
            (currentDirection === 'Right' && !isFlipped)
          ) {
            // setIsStartWalk(false);
            // setIsWalking(false);

            setIsChangeSideWhenWalk(true);
            setAnimation('ChangeSideWhenWalk');

          }else {
            // console.log("isWalking: ", isWalking, movement)
            if (!isStartWalk) {
              setIsWalking(false);
              setAnimation('StartWalk');
             
            }else{
              setIsWalking(true);
              setAnimation('Walk');
            }
           
          }
          setCurrentDirection('Left');
          setIsLeftPressed(true);

          // setAnimation('Walk');
          break;
        case 'ArrowRight':
          if (
            (currentDirection === 'Left' && isFlipped)
          ) {
            // setIsStartWalk(true);
            // setIsWalking(true);
            setIsChangeSideWhenWalk(true);
            setAnimation('ChangeSideWhenWalk');
          }else {
            // console.log("isWalking: ", isWalking, movement)
            if (!isStartWalk) {
              setIsWalking(false);
              setAnimation('StartWalk');
             
            }else{
              setIsWalking(true);
              setAnimation('Walk');
            }
          }
          setCurrentDirection('Right');
          setIsRightPressed(true);

          // setAnimation('Walk');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isFlipped]);

  useEffect(() => {
    const handleWindowKeyUp = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowLeft':

          if (!isChangeSideWhenWalk) {
            setIsLeftPressed(false);
            setIsStartWalk(true);
            setIsWalking(true);
  
            setAnimation('Idle');
          }
         

          break;
        case 'ArrowRight':
          if (!isChangeSideWhenWalk) {
            setIsLeftPressed(false);
            setIsStartWalk(true);
            setIsWalking(true);
  
            setAnimation('Idle');
          }

          break;
        
      }
    };
    window.addEventListener('keyup', handleWindowKeyUp);
  
    return () => {
      window.removeEventListener('keyup', handleWindowKeyUp);
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
        if ((isLeftPressed || isRightPressed) && !isStartWalk) {
          setIsWalking(true);
          setAnimation('Walk');
        } else {
          // Lógica para o movimento StartWalk
          animationInterval = setInterval(() => {
            setFrameIndex((prevFrame) => {
              const nextIndex = prevFrame + 1;
              
              if (nextIndex === alucard[movement].framePositions.length) {
                // A animação de StartWalk terminou, continue para o movimento Walk
                setIsStartWalk(true);
                setIsWalking(false);
                setAnimation('Walk');
              }
              return nextIndex >= alucard[movement].framePositions.length ? 0 : nextIndex;
            });
          }, alucard[movement].animationSpeed);
        }
        break;
      case 'Walk':
        if (!isWalking && (isLeftPressed || isRightPressed)) {
          setIsWalking(false);
          setAnimation('Idle');
        } else {
          animationInterval = setInterval(() => {
            setFrameIndex((prevFrame) => {
              const nextIndex = prevFrame + 1;
              return nextIndex >= alucard[movement].framePositions.length ? 0 : nextIndex;
            });          
          }, alucard[movement].animationSpeed);
        } 
        
        // else {
        //   setIsWalking(false);
        //   //TODO::movimento de parada brusca
        //   setAnimation('Idle');
        // }
        break;
      case 'ChangeSideWhenWalk':
        if (
          isChangeSideWhenWalk
        ) {
          animationInterval = setInterval(() => {
            setFrameIndex((prevFrame) => {
              setIsChangeSideWhenWalk(true);
              const nextIndex = prevFrame + 1;
              if (nextIndex === alucard[movement].framePositions.length) {
                // A animação de ChangeSideWhenWalk terminou, volte para o movimento Walk
                setIsChangeSideWhenWalk(false);
                // setAnimation('Walk');
              }

              return nextIndex >= alucard[movement].framePositions.length ? 0 : nextIndex;
            });
          }, alucard[movement].animationSpeed);
        }
        break;
      default:
        break;
    }

    return () => {
      clearInterval(animationInterval);
    };
  }, [movement, isWalking, isLeftPressed, isRightPressed]);

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

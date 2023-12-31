import React, { useState, useEffect } from 'react';


export default function ChangeSideWhenWalkSprite(
    {
        infor,
        // Walking
        isWalking,
        // espelho
        validateMirrorMode,

        validarStartWalk,
    }) {
        const [frameIndex, setFrameIndex] = useState(0);

        // zera 
        const [step, setStep] = useState(0);

        const totalFrames = infor.framePositions.length;


        const atualizarStatus = () => {
          validarStartWalk();
        }

    useEffect(() => {
        let intervalId;
    
        if (!isWalking ) {
          intervalId = setInterval(() => {
    
            setFrameIndex((prevFrame) => {
              console.log("setWalkFrame: ", prevFrame)
              if ((prevFrame) === 9) {
                atualizarStatus(true);
                return 0;
              }

              const nextIndex = prevFrame + 1;
              return nextIndex >= totalFrames ? 0 : nextIndex;      

            });
            
            setStep((prevStep) => (prevStep === 0 ? 1 : 0));
          }, infor.animationSpeed);
       
        }
    
        return () => {
          clearInterval(intervalId);
        };
      }, [isWalking]);

    const getChangeSideWhenWalkSprite = () => {
      // Organizando o erro de falha do quando quando muda de posição
      const validarCalculoEspelho = 
        validateMirrorMode ? (infor.framePositions[frameIndex]+1) : infor.framePositions[frameIndex];

        // Posição X e Y da folha de Sprinte
        const backgroundPositionX = validarCalculoEspelho;
        const backgroundPositionY = infor.framesPerRow;

        return {
          background: `url(${infor.spriteSheet})`,
          backgroundPosition: `-${backgroundPositionX}px -${backgroundPositionY}px`,
          width: `${infor.spriteWidth}px`,
          height: `${infor.spriteHeight}px`,
          transform: validateMirrorMode ? 'scaleX(-1)' : 'scaleX(1)',
        };
    };

    return (
      <div className="sprite" style={getChangeSideWhenWalkSprite()}></div>
    )
}
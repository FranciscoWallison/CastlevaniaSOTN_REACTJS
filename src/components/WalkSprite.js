import React, { useState, useEffect } from 'react';


export default function WalkSprite(
    {
        infor,
        // Walking
        isWalking,
        // espelho
        validateMirrorMode
    }) {
        const [frameIndex, setFrameIndex] = useState(0);
        const [position, setPosition] = useState(0);


        // zera 
        const [step, setStep] = useState(0);

        const totalFrames = infor.framePositions.length;

    useEffect(() => {
        let intervalId;
    
        if (isWalking ) {
          intervalId = setInterval(() => {
            setPosition((prevPosition) => prevPosition + 10);
    
            setFrameIndex((prevFrame) => {
              console.log("setWalkFrame: ", prevFrame)
              const nextIndex = prevFrame + 1;
              return nextIndex >= totalFrames ? 0 : nextIndex;      

            });
            
            setStep((prevStep) => (prevStep === 0 ? 1 : 0));
        }, infor.animationSpeed);
       
        } else {
          setPosition(0);
        }
    
        return () => {
          clearInterval(intervalId);
        };
      }, [isWalking]);

    const getWalkSprite = () => {
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
      <div className="sprite" style={getWalkSprite()}></div>
    )
}
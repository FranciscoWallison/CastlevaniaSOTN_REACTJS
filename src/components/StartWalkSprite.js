import React, { useState, useEffect } from 'react';


export default function StartWalkSprite(
    {
        infor,
        // Walking
        isStartWalking,
        validarStartWalk
    }) {
        const [frameIndex, setFrameIndex] = useState(0);
        const [position, setPosition] = useState(0);


        // zera 
        const [step, setStep] = useState(0);

        const totalFrames = infor.framePositions.length;

        const atualizarStatus = () => {
          validarStartWalk();
        }

    useEffect(() => {
        let intervalId;
    
        if (!isStartWalking ) {
          intervalId = setInterval(() => {
            setPosition((prevPosition) => prevPosition + 10);
    
            setFrameIndex((prevFrame) => {
              console.log("setWalkFrame: ", prevFrame, prevFrame === 14)
              if ((prevFrame) === 14) {
                atualizarStatus(true);
                return 0;
              }
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
      }, [isStartWalking]);

    const getWalkSprite = () => {
        const backgroundPositionX = infor.framePositions[frameIndex];
        const backgroundPositionY = infor.framesPerRow;
        return {
          background: `url(${infor.spriteSheet})`,
          backgroundPosition: `-${backgroundPositionX}px -${backgroundPositionY}px`,
          width: `${infor.spriteWidth}px`,
          height: `${infor.spriteHeight}px`,
        };
    };

    return (
      <div className="sprite" style={getWalkSprite()}></div>
    )
}
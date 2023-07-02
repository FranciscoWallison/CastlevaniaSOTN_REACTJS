import React, { useState, useEffect } from 'react';


export default function WalkSprite(
    {
        infor,
        // Walking
        isWalking
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
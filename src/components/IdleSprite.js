import React, { useState, useEffect } from 'react';

// import idleSpriteSheet from '../sprites/character-sprite-sheet.png';

export default function IdleSprite(
    {
        infor,
        // Walking
        isIdle
    }) {
        const [frameIndex, setFrameIndex] = useState(0);
        const totalFrames = infor.framePositions.length;

    // const spriteWidth = 114; // Largura de cada quadro do sprite
    // const spriteHeight = 93; // Altura de cada quadro do sprite
    // // 22 - 141 = 119
    // // 141 - 260 = 119
    // const framePositions = [22, 141, 260, 379, 498, 617]; // Posições dos quadros em pixels
    // const framesIdlePerRow = 17; // Quantidade de quadros por linha na folha de sprite
    // const animationSpeed = 200; // Velocidade da transição entre os quadros em milissegundos

    useEffect(() => {
        let intervalId;
    
        if (!isIdle) {
          intervalId = setInterval(() => {
            setFrameIndex((prevFrame) => {
              const nextIndex = prevFrame + 1;
              return nextIndex >= totalFrames ? 0 : nextIndex;          
            });
          }, infor.animationSpeed);
        } else {
          setFrameIndex(0);
        }
    
        return () => {
          clearInterval(intervalId);
        };
    }, [isIdle]);

    const getIdleSprite = () => {
        const backgroundPositionX = infor.framePositions[frameIndex];
        const backgroundPositionY = infor.framesPerRow;    
    console.log(infor.framePositions[frameIndex] , infor.framesPerRow, infor)
        return {
          background: `url(${infor.spriteSheet})`,
          backgroundPosition: `-${backgroundPositionX}px -${backgroundPositionY}px`,
          width: `${infor.spriteWidth}px`,
          height: `${infor.spriteHeight}px`,
        };
    };

    return (
        <div className="sprite" style={getIdleSprite()}></div>
    )
}
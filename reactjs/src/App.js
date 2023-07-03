import React, { useState, useEffect } from 'react';

type CharacterMovement = 'Idle' | 'StartWalk' | 'Walk' | 'ChangeSideWhenWalk';

const Character: React.FC = () => {
  const [movement, setMovement] = useState<CharacterMovement>('Idle');
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Verifique se o jogador pressionou a tecla para a esquerda ou direita
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        // Defina a direção correta e inicie a animação de mudança de lado
        setIsFlipped(event.key === 'ArrowRight');
        setMovement('ChangeSideWhenWalk');
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
        }, 100);
        break;
      case 'StartWalk':
        // Lógica para o movimento StartWalk
        break;
      case 'Walk':
        // Lógica para o movimento Walk
        break;
      case 'ChangeSideWhenWalk':
        // Lógica para a animação de mudança de lado durante a caminhada
        break;
      default:
        break;
    }

    return () => {
      clearInterval(animationInterval);
    };
  }, [movement]);

  return (
    // Renderize o elemento do personagem com a folha de sprite animada
    // Utilize a propriedade isFlipped para definir a direção da animação
    <div>
      Character Sprite Animation Here
    </div>
  );
};

export default Character;

import React from 'react';
import alucard from './infor/alucard.json';
import characterSpriteSheet from './sprites/character-sprite-sheet.png'; 

interface State {
    animation: 'Idle' | 'StartWalk' | 'Walk' | 'ChangeSideWhenWalk';
    isFlipped: boolean;
    direction: 'Right' | 'Left';
    isLeftPressed: boolean;
    isRightPressed: boolean;

    isWalking: boolean;
    isChangeSideWhenWalk: boolean;
    isStartWalk: boolean;
    // animação
    animationIntervalId: any;
    frameIndex: any;
    playAlucard: any;
}

class Animation extends React.Component<{}, State> {
  constructor(props: any) {
    super(props);
    this.state = {
        animation: 'Idle',
        isFlipped: false,
        direction: 'Right',
        isLeftPressed: false,
        isRightPressed: false,

        isWalking: false,
        isChangeSideWhenWalk: false,
        isStartWalk: false,

        // animação
        animationIntervalId: null,
        frameIndex: 0,
        playAlucard: alucard
    };
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('keyup', this.handleKeyUp);
    this.startAnimation(); // Inicia a animação assim que o componente for montado
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('keyup', this.handleKeyUp);
    this.stopAnimation(); // Certifique-se de parar a animação antes de desmontar o componente
  }

  handleKeyDown = (event: KeyboardEvent) => {
    this.stopAnimation();
        const { 
            isFlipped,
            direction,
            isStartWalk
        } = this.state;

        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
            // Defina a direção correta e inicie a animação de mudança de lado
            this.setState({ isFlipped: event.key === 'ArrowLeft' });
        }

        switch (event.key) {
            case 'ArrowLeft':
                // Logica para validar se ele mudou de posição
                if (
                (direction === 'Right' && !isFlipped)
                ) {

                    this.setState({
                        animation: 'ChangeSideWhenWalk',
                        isChangeSideWhenWalk: true
                    });

                }else {
                    // if (!isStartWalk) {
                    //     this.setState({
                    //         animation: 'StartWalk',
                    //         isWalking: false
                    //     });

                    // }else{
                    //     this.setState({
                    //         animation: 'Walk',
                    //         isWalking: true
                    //     });
                    // }

                }
                this.setState({
                    direction: 'Left',
                    isLeftPressed: true
                });

            // setAnimation('Walk');
            break;
            case 'ArrowRight':
                if (
                    (direction === 'Left' && !isFlipped)
                ) {
                    
                    this.setState({
                        animation: 'ChangeSideWhenWalk',
                        isChangeSideWhenWalk: true
                    });
                    
                }else {
                    // if (!isStartWalk) {
                    //     this.setState({
                    //         animation: 'StartWalk',
                    //         isWalking: false
                    //     });

                    // }else{
                    //     this.setState({
                    //         animation: 'Walk',
                    //         isWalking: true
                    //     });
                    // }

                }

                this.setState({
                    direction: 'Right',
                    isRightPressed: true
                });

            // setAnimation('Walk');
            break;
        }

        this.startAnimation();
    };

    handleKeyUp = (event: KeyboardEvent) => {
        this.stopAnimation();

        const { 
            isChangeSideWhenWalk
        } = this.state;

        switch (event.key) {
            case 'ArrowLeft':

                if (!isChangeSideWhenWalk) {
                    this.setState({
                        animation: "Idle",
                        isLeftPressed: false,
                        isStartWalk: true,
                        isWalking: true
                    });
                }
            break;
            case 'ArrowRight':
                if (!isChangeSideWhenWalk) {
                    this.setState({
                        animation: "Idle",
                        isRightPressed: false,
                        isStartWalk: true,
                        isWalking: true
                    });
                }
            break;        
        }
        
        
        this.startAnimation();
    };

    startAnimation = () => {
        const { 
            animation,
            playAlucard
        } = this.state;
        let animationIntervalId: NodeJS.Timeout;
        // Lógica para controlar os movimentos do personagem
        switch (animation)
        {
            case 'Walk':
                // debugger;
                // animationIntervalId = setInterval(() => {
                //     // Atualize a folha de sprite com a animação correspondente
                //     this.setState({
                //         frameIndex: ((prevFrame: any) => {
                //             const nextIndex = prevFrame + 1;
                //             return nextIndex >= playAlucard[animation].framePositions.length ? 0 : nextIndex;          
                //         })
                //     });
                // }, playAlucard[animation].animationSpeed);
            // break;
            default:
                animationIntervalId = setInterval(() => {
                    // Atualize a folha de sprite com a animação correspondente
                    let { 
                        frameIndex,
                        playAlucard,
                        animation
                    } = this.state;

                    const nextIndex = frameIndex + 1;
                    this.setState({
                        frameIndex: 
                            nextIndex >= playAlucard[animation].framePositions.length ? 0 : nextIndex
                        });
                }, playAlucard[animation].animationSpeed);
            break;
        }

        this.setState({ animationIntervalId });
    };

    stopAnimation = () => {
        const { animationIntervalId } = this.state;
        clearInterval(animationIntervalId);
        this.setState({ animationIntervalId: null });
    };

    getIdleSprite = () => {
        const { 
            isFlipped,
            frameIndex,
            animation,
            playAlucard
        } = this.state;
        const spriteWidth = 110; // Largura de cada quadro do sprite
        const spriteHeight = 93; // Altura de cada quadro do sprite

        // Organizando o erro de falha do quando quando muda de posição
        const validarCalculoEspelho = 
        isFlipped ? (alucard[animation].framePositions[frameIndex]+1) : playAlucard[animation].framePositions[frameIndex];
          
        // Posição X e Y da folha de Sprinte
        const backgroundPositionX = validarCalculoEspelho;
        const backgroundPositionY = playAlucard[animation].framesPerRow;    
    
        return {
          background: `url(${characterSpriteSheet})`,
          backgroundPosition: `-${backgroundPositionX}px -${backgroundPositionY}px`,
          width: `${spriteWidth}px`,
          height: `${spriteHeight}px`,
          transform: isFlipped ? 'scaleX(-1)' : 'scaleX(1)',
        };
      };

  // Resto do código...
  render() {
    // const { animation, isFlipped } = this.state;



    return (
      <div>
        {/* Renderize o sprite usando animation e isFlipped */}
        <div
            className={`container`}
        >
          <div>
            <div className="sprite" style={this.getIdleSprite()}></div>
          </div>        
        </div>
      </div>
    );
  }
}

export default Animation;

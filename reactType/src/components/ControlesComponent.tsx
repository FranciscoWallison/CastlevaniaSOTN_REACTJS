import React from 'react';
import AnimationSprite from './Animations/AnimationSprite';
import alucardString from './infor/alucard_canvas.json';
import spriteSheet from './sprites/character-sprite-sheet.png';

type inforSprits = { framePositions: number[]; framesPerRow: number; animationSpeed: number; } ;

interface Alucard {
  frameWidth: number;
  frameHeight: number;
  Idle: inforSprits;
  StartWalk: inforSprits;
  Walk: inforSprits,
  ChangeSideWhenWalk: inforSprits
}

class ControlesComponent extends React.Component<{}, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      isFlipped: false,
      currentDirection: 'Right',
      // Start Sprits
      animationSprit: "Idle",
      isAnimationPlaying: false,
      // Irar para quando a sprit chegar no fim de sua quantidade
      isSpiritsQuantity: true,
      frameIndex: 0
    };
  }

  handleKeyDown = (event: any) => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      // Defina a direção correta e inicie a animação de mudança de lado
      this.setState({
        isFlipped: event.key === 'ArrowLeft'
      });
    }

    if (event.key === 'ArrowRight') {

      if (
        (this.state.currentDirection === 'Left' && !this.state.isFlipped)
      ) {
        this.setState({
          frameIndex: 0,
          isSpiritsQuantity: true,
          animationSprit: "ChangeSideWhenWalk"
        });
  
      }else {
        this.setState({
          frameIndex: 0,
          isSpiritsQuantity: true,
          animationSprit: "StartWalk"
        });
      }
      
      this.setState({
        currentDirection: "Right",
      });
      
    }

    if (event.key === 'ArrowLeft' ) {
      if (
        (this.state.currentDirection === 'Right' && !this.state.isFlipped)
      ) {
        this.setState({
          frameIndex: 0,
          isSpiritsQuantity: true,
          animationSprit: "ChangeSideWhenWalk"
        });
  
      }else {
        this.setState({
          frameIndex: 0,
          isSpiritsQuantity: true,
          animationSprit: "StartWalk"
        });
      }
      
      this.setState({
        currentDirection: "Left",
      });
    }
  };

  handleKeyUp = (event: any) => {
    if (event.key === 'ArrowRight') {
     
      this.setState({
        frameIndex: 0,
        isSpiritsQuantity: false,
        animationSprit: "Idle"
      });
    }
    
    if (event.key === 'ArrowLeft') {
     
      this.setState({
        frameIndex: 0,
        isSpiritsQuantity: false,
        animationSprit: "Idle"
      });
    }
  };

  handleAnimationStop = () => {
    this.setState({ animationStopped: true });
    // Aqui você pode realizar qualquer ação necessária após a animação ser parada

    if( this.state.animationSprit === "StartWalk") {
      this.setState({
        frameIndex: 0,
        animationSprit: "Idle"
      });
    }
  };


  getFrameIndex = () => {
    return this.state.frameIndex;
  }

  setFrameIndex = (frameIndex: number) => {
    this.setState({ 
      frameIndex: frameIndex
    });
  }

  componentDidUpdate(prevProps: any, prevState: any) {
    if (prevState.animationStopped !== this.state.animationStopped && this.state.animationStopped) {
      // A animação foi parada no componente filho
      console.log('Animação foi parada');
      
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
    document.addEventListener('keyup', this.handleKeyUp);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
    document.removeEventListener('keyup', this.handleKeyUp);
  }

  render() {
    const alucard: Alucard = alucardString;
    const animationSprit = this.state.animationSprit;
    if (typeof animationSprit === 'string' && animationSprit in alucard) {
      let animation = alucard.Idle;
      switch (animationSprit) {
        case "Idle":
          animation = alucard.Idle;
        break;
        case "StartWalk":
          animation = alucard.StartWalk;
        break;
        case "Walk":
          animation = alucard.Walk;
        break;
        case "ChangeSideWhenWalk":
          animation = alucard.ChangeSideWhenWalk;
        break;
      
        default:
          animation = alucard.Idle;
          break;
      }
    
      // ... faça algo com a animação ...
      return (
        <div>
          <AnimationSprite 
            isFlipped={this.state.isFlipped}
            // Status atual da sprint
            isPlaying={this.state.isAnimationPlaying}
            onAnimationStop={this.handleAnimationStop}
            isSpiritsQuantity={this.state.isSpiritsQuantity}
            // config
            alucard={animation}
            spriteSheet={spriteSheet}
            frameWidth={alucard.frameWidth}
            frameHeight={alucard.frameHeight}
            getFrameIndex={this.getFrameIndex}
            setFrameIndex={this.setFrameIndex}
          />
        </div>
      );
    } else {
      // ... lógica para caso a animação não seja encontrada ...
      return (
        <div>
        </div>
      );
    }

    
  }
}

export default ControlesComponent;

import React from 'react';
import AnimationSprite from './Animations/AnimationSprite';

class ControlesComponent extends React.Component<{}, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      // Start Sprits
      animationSprit: "Idle",
      isAnimationPlaying: false,
      // Irar para quando a sprit chegar no fim de sua quantidade
      isSpiritsQuantity: true
    };
  }

  handleKeyDown = (event: any) => {
    if (event.code === 'ArrowLeft' && !this.state.isAnimationPlaying) {
      this.setState({
        isAnimationPlaying: true,
        animationSprit: "StartWalk"
      });
    }
  };

  handleKeyUp = (event: any) => {
    if (event.code === 'ArrowLeft') {
     
      this.setState({ 
        isAnimationPlaying: false,
        animationSprit: "Idle"
       });
    }
  };

  handleAnimationStop = () => {
    this.setState({ animationStopped: true });
    // Aqui você pode realizar qualquer ação necessária após a animação ser parada
  };

  componentDidUpdate(prevProps: any, prevState: any) {
    if (prevState.animationStopped !== this.state.animationStopped && this.state.animationStopped) {
      // A animação foi parada no componente filho
      console.log('Animação foi parada');
      this.setState({ 
        isAnimationPlaying: false
      });
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
    return (
      <div>
        <AnimationSprite 
          animationSprit={this.state.animationSprit}
          // Status atual da sprint
          isPlaying={this.state.isAnimationPlaying}
          onAnimationStop={this.handleAnimationStop}
          isSpiritsQuantity={this.state.isSpiritsQuantity}
        />
      </div>
    );
  }
}

export default ControlesComponent;

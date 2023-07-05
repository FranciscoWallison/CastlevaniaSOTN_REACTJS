import React from 'react';
import IdleAnimation from './Animations/IdleAnimation';

class ControlesComponent extends React.Component<{}, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      isAnimationPlaying: false
    };
  }

  handleKeyDown = (event: any) => {
    if (event.code === 'ArrowLeft' && !this.state.isAnimationPlaying) {
      this.setState({ isAnimationPlaying: true });
    }
  };

  handleKeyUp = (event: any) => {
    if (event.code === 'ArrowLeft') {
      this.setState({ isAnimationPlaying: false });
    }
  };

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
        <IdleAnimation isPlaying={this.state.isAnimationPlaying} />
      </div>
    );
  }
}

export default ControlesComponent;

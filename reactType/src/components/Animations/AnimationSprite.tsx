import React from 'react';
// Importe a folha de sprite
import spriteSheet from '../sprites/character-sprite-sheet.png';
import alucard from '../infor/alucard_canvas.json';


interface IAnimationSpritsProps {
  isPlaying: boolean,
  isSpiritsQuantity: boolean,
  onAnimationStop: any,
  // animation
  animationSprit: 'Idle' | 'StartWalk' | 'Walk' | 'ChangeSideWhenWalk'
}
// const AnimationSprite: React.Component<IMyProps> = (props: IMyProps) => {

class AnimationSprite extends React.Component<IAnimationSpritsProps, any> {
  canvasRef!: HTMLCanvasElement | null;

  animationId: any;

  constructor(props: any) {
    super(props);

    this.state = {
      frameIndex: 0
    };
  }

  componentDidMount() {
    // Iniciar a animação quando o componente é montado
    this.animate();
  }

  stopAnimation = () => {
    cancelAnimationFrame(this.animationId);
    if (!this.props.isPlaying && this.props.onAnimationStop) {
      this.props.onAnimationStop();
    }
  };

  // componentWillUnmount() {
  //   // Limpar o agendamento da animação ao desmontar o componente
  //   this.stopAnimation();
  // }


  componentDidUpdate(prevProps: any) {
    // if (prevProps.frameIndex !== this.state.frameIndex) {
    if (prevProps.isPlaying !== this.props.isPlaying) {
      if (this.props.isPlaying) {
        this.componentDidMount();
      } else {
        this.stopAnimation();        
      }
    }
  }

  animate = async () => {
    // Configurações de animação
    const frameWidth = alucard.frameWidth; // Largura de cada frame
    const frameHeight = alucard.frameHeight; // Altura de cada frame
    const totalFrames = alucard[this.props.animationSprit].framePositions.length; // Número total de frames

    // Obter o canvas e contexto
    const canvas = this.canvasRef;
    const context = canvas?.getContext('2d');

    if (context && canvas?.width && canvas?.height) {

      // Limpar o canvas
      context.clearRect(0, 0, canvas.width, canvas.height);

      // Carregar a imagem da folha de sprite
      const spriteImage = new Image();
      spriteImage.src = spriteSheet;

      // Inverter a animação horizontalmente, se necessário
      const isFlipped = false
      const scaleX = isFlipped ? -1 : 1;
      let width = frameWidth;
      let spriteIndex = alucard[this.props.animationSprit].framePositions[this.state.frameIndex]
      console.log('====================================');
      console.log("spriteIndex: ", spriteIndex);
      console.log('====================================');
      if (isFlipped) {
        width = - frameWidth;
        spriteIndex = spriteIndex + 1
      }
      context.scale(scaleX, 1);

      // Desenhar o frame atual da animação
      context.drawImage(
        spriteImage,
        spriteIndex,
        alucard[this.props.animationSprit].framesPerRow,
        frameWidth,
        frameHeight,
        0,
        0,
        width,
        frameHeight
      );


      
      const nextIndex = this.state.frameIndex + 1 ;
      // Atualizar o índice do frame
      this.setState((prevState: any) => ({
        frameIndex: nextIndex === totalFrames ? 0 : nextIndex,
      }));
      // Validar quando a sprit tem que parar quando é por quantidade de frames
      if (
        this.props.isSpiritsQuantity && 
        nextIndex === totalFrames
        ) {
          this.stopAnimation();
      }

      await this.delay(alucard[this.props.animationSprit].animationSpeed).then( () => {
        // Agendar o próximo quadro da animação
        this.animationId = requestAnimationFrame(this.animate);

        // Restaurar a escala original
        context.scale(scaleX, 1);
      });
     
    }
  };

  render() {
    return <canvas ref={(ref) => (this.canvasRef = ref!)} />;
  }

  delay = async (ms: number) => new Promise(
    resolve => setTimeout(resolve, ms)
  );
}

export default AnimationSprite;

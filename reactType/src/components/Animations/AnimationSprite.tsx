import React from 'react';
// Importe a folha de sprite

type inforSprits = { framePositions: number[]; framesPerRow: number; animationSpeed: number; } ;

interface IAnimationSpritsProps {
  isPlaying: boolean,
  isSpiritsQuantity: boolean,
  isFlipped: boolean,
  onAnimationStop: any,
  // configurações
  alucard: inforSprits,
  spriteSheet: any,
  frameWidth: number,
  frameHeight: number,
  getFrameIndex: any,
  setFrameIndex: any
}

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
    // if (prevProps.frameIndex !== this.props.getFrameIndex()) {
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
    const frameWidth = this.props.frameWidth; // Largura de cada frame
    const frameHeight = this.props.frameHeight; // Altura de cada frame
    const totalFrames = this.props.alucard.framePositions.length; // Número total de frames
    const framePositions = this.props.alucard.framePositions;

    // Obter o canvas e contexto
    const canvas = this.canvasRef;
    const context = canvas?.getContext('2d');

    if (context && canvas?.width && canvas?.height) {

      // Limpar o canvas
      context.clearRect(0, 0, canvas.width, canvas.height);

      // Carregar a imagem da folha de sprite
      const spriteImage = new Image();
      spriteImage.src = this.props.spriteSheet; 

      // Inverter a animação horizontalmente, se necessário
      const scaleX = this.props.isFlipped ? -1 : 1;
      let width = frameWidth;
      let spriteIndex = framePositions[this.props.getFrameIndex()]
      
      console.log("isNaN: ", isNaN(spriteIndex),  framePositions[this.props.getFrameIndex()] , framePositions, this.props.getFrameIndex())

      if (this.props.isFlipped) {
        width = - frameWidth;
        spriteIndex = spriteIndex + 1
      }
      context.scale(scaleX, 1);

      // Desenhar o frame atual da animação
      context.drawImage(
        spriteImage,
        spriteIndex,
        this.props.alucard.framesPerRow,
        frameWidth,
        frameHeight,
        0,
        0,
        width,
        frameHeight
      );

      await this.delay(this.props.alucard.animationSpeed).then( () => {
        const nextIndex = this.props.getFrameIndex() + 1 ;
        // Atualizar o índice do frame
        this.props.setFrameIndex(nextIndex >= totalFrames ? 0 : nextIndex);
        // Validar quando a sprit tem que parar quando é por quantidade de frames
        if (
        this.props.isSpiritsQuantity && 
        nextIndex >= totalFrames
        ) {
          this.props.onAnimationStop();
        }
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

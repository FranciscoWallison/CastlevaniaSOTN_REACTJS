import React from 'react';
// Importe a folha de sprite
import spriteSheet from '../sprites/character-sprite-sheet.png';
import alucard from '../infor/alucard_canvas.json';


interface IAnimationSpritsProps {
  isPlaying: boolean,
}
// const IdleAnimation: React.Component<IMyProps> = (props: IMyProps) => {

class IdleAnimation extends React.Component<IAnimationSpritsProps, any> {
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

  animate = () => {
    const animationSprit = "StartWalk";
    // Configurações de animação
    const frameWidth = alucard.frameWidth; // Largura de cada frame
    const frameHeight = alucard.frameHeight; // Altura de cada frame
    const totalFrames = alucard[animationSprit].framePositions.length; // Número total de frames

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
      // const scaleX = this.props.isFlipped ? -1 : 1;
      const scaleX = isFlipped ? -1 : 1;
      let width = frameWidth;
      let spriteIndex = alucard[animationSprit].framePositions[this.state.frameIndex]

      if (isFlipped) {
        width = - frameWidth;
        spriteIndex = spriteIndex + 1
      }
      context.scale(scaleX, 1);

      // Desenhar o frame atual da animação
      context.drawImage(
        spriteImage,
        spriteIndex,
        alucard[animationSprit].framesPerRow,
        frameWidth,
        frameHeight,
        0,
        0,
        width,
        frameHeight
      );

      // Atualizar o índice do frame
      this.setState((prevState: any) => ({
        frameIndex: (prevState.frameIndex + 1) % totalFrames,
      }));

      // Agendar o próximo quadro da animação
      this.animationId = setTimeout(this.animate, alucard[animationSprit].animationSpeed);

      // Restaurar a escala original
      context.scale(scaleX, 1);
    }
  };

  componentWillUnmount() {
    // Limpar o agendamento da animação ao desmontar o componente
    cancelAnimationFrame(this.animationId);
  }

  render() {
    return <canvas ref={(ref) => (this.canvasRef = ref!)} />;
  }
}

export default IdleAnimation;

import Brush from "./Brush";

class Eraser extends Brush {
  constructor(canvas: HTMLCanvasElement) {
    super(canvas);
  }

  protected draw(x: number, y: number) {
    const currentColor = this.context.strokeStyle;
    this.context.strokeStyle = "white";
    this.context?.lineTo(x, y);
    this.context?.stroke();
    this.context.strokeStyle = currentColor;
  }
}

export default Eraser;

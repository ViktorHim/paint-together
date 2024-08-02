import PaintSocket from "../socket/Socket";
import { BrushDrawData, Figures } from "../types/DrawData";
import Brush from "./Brush";

class Eraser extends Brush {
  constructor(canvas: HTMLCanvasElement, socket: PaintSocket) {
    super(canvas, socket);
  }

  drawBroadcast(x: number, y: number) {
    const drawData: BrushDrawData = {
      point: { x, y },
      strokeColor: this.strokeColor,
      figure: Figures.Eraser,
    };

    Brush.draw(drawData, this.context);
    this.socket.sendDrawData(drawData);
  }

  public static draw(
    drawData: BrushDrawData,
    context: CanvasRenderingContext2D
  ) {
    const { point } = drawData;
    context.strokeStyle = "white";
    context.lineTo(point.x, point.y);
    context.stroke();
  }
}
export default Eraser;

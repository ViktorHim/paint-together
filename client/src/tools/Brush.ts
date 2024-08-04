import PaintSocket from "../socket/Socket";
import { BrushDrawData, Figures } from "../types/DrawData";
import Tool from "./Tool";

class Brush extends Tool {
  constructor(canvas: HTMLCanvasElement, socket: PaintSocket) {
    super(canvas, socket);
  }

  protected listenEvents() {
    super.listenEvents();
    this.canvas.onmouseup = this.mouseUpHandler.bind(this);
    this.canvas.onmousedown = this.mouseDownHandler.bind(this);
    this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
  }

  protected mouseUpHandler(event: MouseEvent) {
    this.isMouseDown = false;
    this.socket.sendFinish();
  }

  protected mouseDownHandler(event: MouseEvent) {
    this.isMouseDown = true;
    this.context?.beginPath();
    this.context?.moveTo(this.getClickPosX(event), this.getClickPosY(event));
  }

  protected mouseMoveHandler(event: MouseEvent) {
    if (this.isMouseDown) {
      this.drawBroadcast(this.getClickPosX(event), this.getClickPosY(event));
    }
  }

  protected drawBroadcast(x: number, y: number) {
    const drawData: BrushDrawData = {
      point: { x, y },
      strokeColor: this.strokeColor,
      figure: Figures.Brush,
    };

    Brush.draw(drawData, this.context);
    this.socket.sendDrawData(drawData);
  }

  public static draw(
    drawData: BrushDrawData,
    context: CanvasRenderingContext2D
  ) {
    const { point, strokeColor } = drawData;
    if (strokeColor) {
      context.strokeStyle = strokeColor;
    }
    context.lineTo(point.x, point.y);
    context.stroke();
  }
}

export default Brush;

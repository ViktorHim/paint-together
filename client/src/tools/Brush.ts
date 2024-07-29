import PaintSocket from "../socket/Socket";
import Tool from "./Tool";

class Brush extends Tool {
  constructor(canvas: HTMLCanvasElement, socket: PaintSocket) {
    super(canvas, socket);
    this.listenEvents();
  }

  listenEvents() {
    this.canvas.onmouseup = this.mouseUpHandler.bind(this);
    this.canvas.onmousedown = this.mouseDownHandler.bind(this);
    this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
  }

  mouseUpHandler(event: MouseEvent) {
    this.isMouseDown = false;
    this.socket.sendFinish();
  }

  mouseDownHandler(event: MouseEvent) {
    this.isMouseDown = true;
    this.context?.beginPath();
    this.context?.moveTo(this.getClickPosX(event), this.getClickPosY(event));
  }

  mouseMoveHandler(event: MouseEvent) {
    if (this.isMouseDown) {
      this.drawBroadcast(this.getClickPosX(event), this.getClickPosY(event));
    }
  }

  drawBroadcast(x: number, y: number) {
    Brush.draw(x, y, this.context);
    this.socket.sendDrawData({ x, y, figure: "brush" });
  }

  public static draw(x: number, y: number, context: CanvasRenderingContext2D) {
    context.lineTo(x, y);
    context.stroke();
  }
}

export default Brush;

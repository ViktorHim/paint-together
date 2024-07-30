import PaintSocket from "../socket/Socket";
import { Figures } from "../types/DrawData";
import Tool from "./Tool";

class Line extends Tool {
  startX: number = 0;
  startY: number = 0;
  endX: number = 0;
  endY: number = 0;
  saved: string = "";

  constructor(canvas: HTMLCanvasElement, socket: PaintSocket) {
    super(canvas, socket);
    this.listenEvents();
  }

  private listenEvents() {
    this.canvas.onmouseup = this.mouseUpHandler.bind(this);
    this.canvas.onmousedown = this.mouseDownHandler.bind(this);
    this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
  }

  protected mouseUpHandler(event: MouseEvent) {
    this.isMouseDown = false;

    this.socket.sendDrawData({
      x1: this.startX,
      y1: this.startY,
      x2: this.endX,
      y2: this.endY,
      figure: Figures.Line,
    });
  }

  protected mouseDownHandler(event: MouseEvent) {
    this.isMouseDown = true;
    this.context?.beginPath();
    this.startX = this.getClickPosX(event);
    this.startY = this.getClickPosY(event);
    this.saved = this.canvas.toDataURL();
  }

  protected mouseMoveHandler(event: MouseEvent) {
    if (this.isMouseDown) {
      this.endX = this.getClickPosX(event);
      this.endY = this.getClickPosY(event);
      this.drawWithPreview();
    }
  }

  public static draw(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    context: CanvasRenderingContext2D
  ) {
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
    context.beginPath();
  }

  private drawWithPreview() {
    const img = new Image();
    img.src = this.saved;
    img.onload = () => {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.context.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
      this.context.beginPath();
      this.context.moveTo(this.startX, this.startY);
      this.context.lineTo(this.endX, this.endY);
      this.context.stroke();
    };
  }
}

export default Line;

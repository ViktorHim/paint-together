import PaintSocket from "../socket/Socket";
import { Figures, LineDrawData } from "../types/DrawData";
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

  protected listenEvents() {
    this.canvas.onmouseup = this.mouseUpHandler.bind(this);
    this.canvas.onmousedown = this.mouseDownHandler.bind(this);
    this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
  }

  protected mouseUpHandler(event: MouseEvent) {
    this.isMouseDown = false;

    this.socket.sendDrawData({
      startPoint: { x: this.startX, y: this.startY },
      endPoint: { x: this.endX, y: this.endY },
      figure: Figures.Line,
      strokeColor: this.strokeColor,
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
    drawData: LineDrawData,
    context: CanvasRenderingContext2D
  ) {
    const { startPoint, endPoint, strokeColor } = drawData;

    context.strokeStyle = strokeColor;
    context.beginPath();
    context.moveTo(startPoint.x, startPoint.y);
    context.lineTo(endPoint.x, endPoint.y);
    context.stroke();
    context.beginPath();
  }

  private drawWithPreview() {
    const img = new Image();
    img.src = this.saved;
    img.onload = () => {
      this.context.strokeStyle = this.strokeColor;
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

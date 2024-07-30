import PaintSocket from "../socket/Socket";
import { CircleDrawData, Figures } from "../types/DrawData";
import Tool, { drawMode } from "./Tool";

class Circle extends Tool {
  startX = 0;
  startY = 0;
  endX = 0;
  endY = 0;
  radiusX = 0;
  radiusY = 0;
  centerX = 0;
  centerY = 0;
  saved: string = "";

  isShiftPressed: boolean = false;

  constructor(canvas: HTMLCanvasElement, socket: PaintSocket) {
    super(canvas, socket);
    this.listenEvents();
  }

  private listenEvents() {
    this.canvas.onmouseup = this.mouseUpHandler.bind(this);
    this.canvas.onmousedown = this.mouseDownHandler.bind(this);
    this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
    document.body.onkeydown = this.keydownHandler.bind(this);
    document.body.onkeyup = this.keyupHandler.bind(this);
  }

  protected keyupHandler(event: KeyboardEvent) {
    const key = event.key;
    if (key === "Shift") {
      this.isShiftPressed = false;
    }
  }

  protected keydownHandler(event: KeyboardEvent) {
    const key = event.key;

    if (key === "Shift") {
      this.isShiftPressed = true;
    }
  }

  protected mouseUpHandler(event: MouseEvent) {
    this.isMouseDown = false;

    this.socket.sendDrawData({
      centerX: this.centerX,
      centerY: this.centerY,
      radiusX: this.radiusX,
      radiusY: this.radiusY,
      mode: this.mode,
      figure: Figures.Circle,
      strokeColor: this.context.strokeStyle,
      fillColor: this.context.fillStyle,
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

      this.radiusX = Math.abs(this.endX - this.startX) / 2;
      this.radiusY = Math.abs(this.endY - this.startY) / 2;
      this.centerX = (this.endX + this.startX) / 2;
      this.centerY = (this.endY + this.startY) / 2;

      if (this.isShiftPressed) {
        this.radiusX =
          Math.sqrt(
            Math.pow(this.endX - this.startX, 2) +
              Math.pow(this.endY - this.startY, 2)
          ) / 2;
        this.radiusY = this.radiusX;
      }

      this.drawWithPreview();
    }
  }

  public static draw(
    drawData: CircleDrawData,
    context: CanvasRenderingContext2D
  ) {
    const {
      centerX,
      centerY,
      radiusX,
      radiusY,
      rotation = 0,
      startAngle = 0,
      endAngle = 2 * Math.PI,
      mode,
    } = drawData;

    console.log("draw", drawData);

    context.beginPath();
    context.ellipse(
      centerX,
      centerY,
      radiusX,
      radiusY,
      rotation,
      startAngle,
      endAngle
    );
    if (mode === "fill") {
      context.fill();
    }
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
      this.context.ellipse(
        this.centerX,
        this.centerY,
        this.radiusX,
        this.radiusY,
        0,
        0,
        2 * Math.PI
      );
      if (this.mode === "fill") {
        this.context.fill();
      }
      this.context.stroke();
    };
  }
}

export default Circle;

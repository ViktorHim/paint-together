import PaintSocket from "../socket/Socket";
import { Figures, RectDrawData } from "../types/DrawData";
import Tool, { drawMode } from "./Tool";

class Rect extends Tool {
  startX: number = 0;
  startY: number = 0;
  height: number = 0;
  width: number = 0;
  saved: string = "";

  isShiftPressed: boolean = false;

  constructor(canvas: HTMLCanvasElement, socket: PaintSocket) {
    super(canvas, socket);
    this.listenEvents();
  }

  protected listenEvents() {
    super.listenEvents();
    this.canvas.onmouseup = this.mouseUpHandler.bind(this);
    this.canvas.onmousedown = this.mouseDownHandler.bind(this);
    this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
    document.body.onkeydown = this.keydownHandler.bind(this);
    document.body.onkeyup = this.keyupHandler.bind(this);
  }

  protected keyupHandler(event: KeyboardEvent) {
    const key = event.key;
    console.log(key);
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
      rect: { x: this.startX, y: this.startY, w: this.width, h: this.height },
      mode: this.mode,
      figure: Figures.Rect,
      fillColor: this.fillColor,
      strokeColor: this.strokeColor,
    });

    this.socket.sendFinish();
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
      const endX = this.getClickPosX(event);
      const endY = this.getClickPosY(event);

      this.width = endX - this.startX;
      this.height = endY - this.startY;

      if (this.isShiftPressed) {
        this.width =
          (this.width / Math.abs(this.width)) *
          Math.min(Math.abs(this.width), Math.abs(this.height));
        this.height =
          (this.height / Math.abs(this.height)) *
          Math.min(Math.abs(this.width), Math.abs(this.height));

        this.drawWithPreview(this.startX, this.startY, this.height, this.width);
      } else {
        this.drawWithPreview(this.startX, this.startY, this.width, this.height);
      }
    }
  }

  public static draw(
    drawData: RectDrawData,
    context: CanvasRenderingContext2D
  ) {
    const { rect, fillColor, strokeColor, mode } = drawData;

    context.fillStyle = fillColor;
    context.strokeStyle = strokeColor;
    context.beginPath();
    context.rect(rect.x, rect.y, rect.w, rect.h);
    if (mode === "fill") {
      context.fill();
    }
    context.stroke();
    context.beginPath();
  }

  private drawWithPreview(x: number, y: number, w: number, h: number) {
    const img = new Image();
    img.src = this.saved;
    img.onload = () => {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.context.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
      this.context.beginPath();
      this.context.rect(x, y, w, h);
      if (this.mode === "fill") {
        this.context.fill();
      }
      this.context.stroke();
    };
  }
}

export default Rect;

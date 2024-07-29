import PaintSocket from "../socket/Socket";
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

  private listenEvents() {
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
      x: this.startX,
      y: this.startY,
      width: this.width,
      height: this.height,
      mode: this.mode,
      figure: "rect",
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
    x: number,
    y: number,
    w: number,
    h: number,
    mode: drawMode,
    context: CanvasRenderingContext2D
  ) {
    context.beginPath();
    context.rect(x, y, w, h);
    if (mode === "fill") {
      context.fill();
    }
    context.stroke();
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

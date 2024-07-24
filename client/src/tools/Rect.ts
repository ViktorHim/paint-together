import Tool from "./Tool";

class Rect extends Tool {
  startX: number = 0;
  startY: number = 0;
  endX: number = 0;
  endY: number = 0;
  saved: string = "";

  isShiftPressed: boolean = false;

  constructor(canvas: HTMLCanvasElement) {
    super(canvas);
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
    console.log(event);
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

      const width = this.endX - this.startX;
      const height = this.endY - this.startY;

      if (this.isShiftPressed) {
        const newWidth =
          (width / Math.abs(width)) *
          Math.min(Math.abs(width), Math.abs(height));
        const newHeight =
          (height / Math.abs(height)) *
          Math.min(Math.abs(width), Math.abs(height));

        this.draw(this.startX, this.startY, newWidth, newHeight);
      } else {
        this.draw(this.startX, this.startY, width, height);
      }
    }
  }

  private draw(x: number, y: number, w: number, h: number) {
    const img = new Image();
    img.src = this.saved;
    img.onload = () => {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.context.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
      this.context.beginPath();
      this.context.rect(x, y, w, h);
      // this.context.fill();
      this.context.stroke();
    };
  }
}

export default Rect;

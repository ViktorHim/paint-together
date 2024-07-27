import Tool from "./Tool";

class Circle extends Tool {
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

      const radiusX = Math.abs(this.endX - this.startX) / 2;
      const radiusY = Math.abs(this.endY - this.startY) / 2;
      const centerX = (this.endX + this.startX) / 2;
      const centerY = (this.endY + this.startY) / 2;

      if (this.isShiftPressed) {
        const newRadius =
          Math.sqrt(
            Math.pow(this.endX - this.startX, 2) +
              Math.pow(this.endY - this.startY, 2)
          ) / 2;
        this.draw(centerX, centerY, newRadius, newRadius);
      } else {
        this.draw(centerX, centerY, radiusX, radiusY);
      }
    }
  }

  private draw(x: number, y: number, radiusX: number, radiusY: number) {
    const img = new Image();
    img.src = this.saved;
    img.onload = () => {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.context.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
      this.context.beginPath();
      this.context.ellipse(x, y, radiusX, radiusY, 0, 0, 2 * Math.PI);
      if (this.mode === "fill") {
        this.context.fill();
      }
      this.context.stroke();
    };
  }
}

export default Circle;

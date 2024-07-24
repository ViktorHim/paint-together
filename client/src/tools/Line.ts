import Tool from "./Tool";

class Line extends Tool {
  startX: number = 0;
  startY: number = 0;
  endX: number = 0;
  endY: number = 0;
  saved: string = "";

  constructor(canvas: HTMLCanvasElement) {
    super(canvas);
    this.listenEvents();
  }

  private listenEvents() {
    this.canvas.onmouseup = this.mouseUpHandler.bind(this);
    this.canvas.onmousedown = this.mouseDownHandler.bind(this);
    this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
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
      this.draw(this.endX, this.endY);
    }
  }

  private draw(x: number, y: number) {
    const img = new Image();
    img.src = this.saved;
    img.onload = () => {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.context.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
      this.context.beginPath();
      this.context.moveTo(this.startX, this.startY);
      this.context.lineTo(x, y);
      this.context.stroke();
    };
  }
}

export default Line;

import Tool from "./Tool";

class Brush extends Tool {
  constructor(canvas: HTMLCanvasElement) {
    super(canvas);
    this.listenEvents();
  }

  listenEvents() {
    this.canvas.onmouseup = this.mouseUpHandler.bind(this);
    this.canvas.onmousedown = this.mouseDownHandler.bind(this);
    this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
  }

  mouseUpHandler(event: MouseEvent) {
    this.isMouseDown = false;
    console.log(event);
  }

  mouseDownHandler(event: MouseEvent) {
    this.isMouseDown = true;
    this.context?.beginPath();
    this.context?.moveTo(this.getClickPosX(event), this.getClickPosY(event));
  }

  mouseMoveHandler(event: MouseEvent) {
    if (this.isMouseDown) {
      this.draw(this.getClickPosX(event), this.getClickPosY(event));
    }
  }

  public draw(x: number, y: number) {
    this.context?.lineTo(x, y);
    this.context?.stroke();
  }
}

export default Brush;

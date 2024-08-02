import PaintSocket from "../socket/Socket";

export type drawMode = "border" | "fill";

class Tool {
  protected canvas: HTMLCanvasElement;
  protected context: CanvasRenderingContext2D;
  protected isMouseDown: boolean;
  protected socket: PaintSocket;
  protected mode: drawMode = "border";

  protected fillColor: string = "black";
  protected strokeColor: string = "black";

  protected mouseUpHandler?(event: MouseEvent): void;
  protected mouseDownHandler?(event: MouseEvent): void;
  protected mouseMoveHandler?(event: MouseEvent): void;

  constructor(canvas: HTMLCanvasElement, socket: PaintSocket) {
    this.socket = socket;
    this.canvas = canvas;
    this.context = canvas.getContext("2d") as CanvasRenderingContext2D;
    this.isMouseDown = false;
    this.removeEvents();
  }

  private removeEvents() {
    this.canvas.onmouseup = null;
    this.canvas.onmousedown = null;
    this.canvas.onmousemove = null;
    document.body.onkeydown = null;
    document.body.onkeyup = null;
  }

  public set drawMode(mode: drawMode) {
    this.mode = mode;
  }

  public set FillColor(color: string) {
    this.fillColor = color;
  }

  public set StrokeColor(color: string) {
    this.strokeColor = color;
  }

  public set lineWidth(width: number) {
    this.context.lineWidth = width;
  }

  public clear() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  protected getClickPosX(event: MouseEvent): number {
    return event.pageX - (event.target as HTMLElement).offsetLeft;
  }

  protected getClickPosY(event: MouseEvent): number {
    return event.pageY - (event.target as HTMLElement).offsetTop;
  }
}

export default Tool;

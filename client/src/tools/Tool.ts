class Tool {
  protected canvas: HTMLCanvasElement;
  protected context: CanvasRenderingContext2D | null;
  protected isMouseDown: boolean;

  protected draw?(x: number, y: number): void;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
    this.isMouseDown = false;
    this.removeEvents();
  }

  private removeEvents() {
    this.canvas.onmouseup = null;
    this.canvas.onmousedown = null;
    this.canvas.onmousemove = null;
  }

  protected getClickPosX(event: MouseEvent): number {
    return event.pageX - (event.target as HTMLElement).offsetLeft;
  }

  protected getClickPosY(event: MouseEvent): number {
    return event.pageY - (event.target as HTMLElement).offsetTop;
  }
}

export default Tool;

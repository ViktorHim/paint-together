import { Settings } from "../types/Settings";

export type drawMode = "border" | "fill" | "solid";

abstract class Tool {
    protected toolName: string;

    protected readonly canvas: HTMLCanvasElement;
    protected readonly context: CanvasRenderingContext2D;

    protected isMouseDown: boolean;

    protected mode: drawMode = "border";
    protected fillColor: string = "black";
    protected strokeColor: string = "black";
    protected lineWidth: number = 1;

    protected mouseUpHandler?(event: MouseEvent): void;
    protected mouseDownHandler?(event: MouseEvent): void;
    protected mouseMoveHandler?(event: MouseEvent): void;

    abstract hasDrawProperty(setting : Settings): boolean;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.context = canvas.getContext("2d") as CanvasRenderingContext2D;
        this.isMouseDown = false;
        this.toolName = "tool";
        this.removeEvents();
        this.listenEvents();
    }

    protected listenEvents() {
        this.canvas.onmouseleave = this.mouseLeaveHandler.bind(this);
    }

    private mouseLeaveHandler() {
        this.context.beginPath();
        this.isMouseDown = false;
    }

    private removeEvents() {
        this.canvas.onmouseup = null;
        this.canvas.onmousedown = null;
        this.canvas.onmousemove = null;
        this.canvas.onmouseleave = null;
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

    public set LineWidth(width: number) {
        this.lineWidth = width;
    }

    public get ToolName(): string {
        return this.toolName;
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

import SocketState from "../store/SocketState";
import { Figures, LineDrawData } from "../types/DrawData";
import { Settings } from "../types/Settings";
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
        this.toolName = "Line";
    }

    public override hasDrawProperty(setting: Settings): boolean {
        switch(setting) {
        case Settings.DRAW_MODE: return false;
        case Settings.LINE_WIDTH: return true;
        case Settings.STROKE_COLOR: return true;
        case Settings.FILL_COLOR: return false;
        case Settings.GENERAL_COLOR: return false;
        }
    }

    protected override listenEvents() {
        super.listenEvents();
        this.canvas.onmouseup = this.mouseUpHandler.bind(this);
        this.canvas.onmousedown = this.mouseDownHandler.bind(this);
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
    }

    protected mouseUpHandler(event: MouseEvent) {
        this.isMouseDown = false;

        SocketState.sendDraw({
            startPoint: { x: this.startX, y: this.startY },
            endPoint: { x: this.endX, y: this.endY },
            figure: Figures.Line,
            strokeColor: this.strokeColor,
            lineWidth: this.lineWidth,
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
            this.drawWithPreview();
        }
    }

    public static draw(
        drawData: LineDrawData,
        context: CanvasRenderingContext2D
    ) {
        const { startPoint, endPoint, strokeColor, lineWidth } = drawData;

        context.strokeStyle = strokeColor;
        context.lineWidth = lineWidth;

        context.beginPath();
        context.moveTo(startPoint.x, startPoint.y);
        context.lineTo(endPoint.x, endPoint.y);
        context.stroke();
        context.beginPath();
    }

    private drawWithPreview() {
        const img = new Image();
        img.src = this.saved;
        img.onload = () => {
            this.context.strokeStyle = this.strokeColor;
            this.context.lineWidth = this.lineWidth;

            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.context.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
            this.context.beginPath();
            this.context.moveTo(this.startX, this.startY);
            this.context.lineTo(this.endX, this.endY);
            this.context.stroke();
        };
    }
}

export default Line;

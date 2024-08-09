import SocketState from "../store/SocketState";
import { BrushDrawData, Figures } from "../types/DrawData";
import { Settings } from "../types/Settings";
import Tool from "./Tool";

class Brush extends Tool {
    constructor(canvas: HTMLCanvasElement) {
        super(canvas);
        this.toolName = "Brush";
    }

    protected override listenEvents() {
        super.listenEvents();
        this.canvas.onmouseup = this.mouseUpHandler.bind(this);
        this.canvas.onmousedown = this.mouseDownHandler.bind(this);
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
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

    protected mouseUpHandler(event: MouseEvent) {
        this.isMouseDown = false;
        SocketState.sendFinish();
    }

    protected mouseDownHandler(event: MouseEvent) {
        this.isMouseDown = true;
        this.context?.beginPath();
        this.context?.moveTo(this.getClickPosX(event), this.getClickPosY(event));
    }

    protected mouseMoveHandler(event: MouseEvent) {
        if (this.isMouseDown) {
            this.drawBroadcast(this.getClickPosX(event), this.getClickPosY(event));
        }
    }

    protected drawBroadcast(x: number, y: number) {
        const drawData: BrushDrawData = {
            point: { x, y },
            strokeColor: this.strokeColor,
            figure: Figures.Brush,
            lineWidth: this.lineWidth,
        };

        Brush.draw(drawData, this.context);
        SocketState.sendDraw(drawData);
    }

    public static draw(
        drawData: BrushDrawData,
        context: CanvasRenderingContext2D
    ) {
        const { point, strokeColor, lineWidth } = drawData;
        if (strokeColor) {
            context.strokeStyle = strokeColor;
        }
        context.lineWidth = lineWidth;
        context.lineTo(point.x, point.y);
        context.stroke();
    }
}

export default Brush;

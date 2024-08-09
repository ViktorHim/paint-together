import SocketState from "../store/SocketState";
import { BrushDrawData, Figures } from "../types/DrawData";
import { Settings } from "../types/Settings";
import Brush from "./Brush";

class Eraser extends Brush {
    constructor(canvas: HTMLCanvasElement) {
        super(canvas);
        this.toolName = "Eraser";
    }

    public override hasDrawProperty(setting: Settings): boolean {
        switch(setting) {
        case Settings.DRAW_MODE: return false;
        case Settings.LINE_WIDTH: return true;
        case Settings.STROKE_COLOR: return false;
        case Settings.FILL_COLOR: return false;
        case Settings.GENERAL_COLOR: return false;
        }
    }

    protected override drawBroadcast(x: number, y: number) {
        const drawData: BrushDrawData = {
            point: { x, y },
            strokeColor: this.strokeColor,
            figure: Figures.Eraser,
        };

        Brush.draw(drawData, this.context);
        SocketState.sendDraw(drawData);
    }

    public static override draw(
        drawData: BrushDrawData,
        context: CanvasRenderingContext2D
    ) {
        const { point } = drawData;
        context.strokeStyle = "#ffffff";
        context.lineTo(point.x, point.y);
        context.stroke();
    }
}
export default Eraser;

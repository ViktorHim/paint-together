import SocketState from "../store/SocketState";
import { Figures, RectDrawData } from "../types/DrawData";
import { Settings } from "../types/Settings";
import Tool from "./Tool";

class Rect extends Tool {
    startX: number = 0;
    startY: number = 0;
    height: number = 0;
    width: number = 0;
    saved: string = "";

    isShiftPressed: boolean = false;

    constructor(canvas: HTMLCanvasElement) {
        super(canvas);
        this.listenEvents();
        this.toolName = "Rectangle";
    }

    protected override listenEvents() {
        super.listenEvents();
        this.canvas.onmouseup = this.mouseUpHandler.bind(this);
        this.canvas.onmousedown = this.mouseDownHandler.bind(this);
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
        document.body.onkeydown = this.keydownHandler.bind(this);
        document.body.onkeyup = this.keyupHandler.bind(this);
    }

    public override hasDrawProperty(setting: Settings): boolean {
        switch(setting) {
        case Settings.DRAW_MODE: return true;
        case Settings.LINE_WIDTH: return true
        case Settings.STROKE_COLOR: return true;
        case Settings.FILL_COLOR: return true;
        case Settings.GENERAL_COLOR: return true;
        }
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

        SocketState.sendDraw({
            rect: { x: this.startX, y: this.startY, w: this.width, h: this.height },
            mode: this.mode,
            figure: Figures.Rect,
            fillColor: this.fillColor,
            strokeColor: this.strokeColor,
        });

        SocketState.sendFinish();
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
            const endX = this.getClickPosX(event);
            const endY = this.getClickPosY(event);

            this.width = endX - this.startX;
            this.height = endY - this.startY;

            if (this.isShiftPressed) {
                this.width =
          (this.width / Math.abs(this.width)) *
          Math.min(Math.abs(this.width), Math.abs(this.height));
                this.height =
          (this.height / Math.abs(this.height)) *
          Math.min(Math.abs(this.width), Math.abs(this.height));

                this.drawWithPreview(this.startX, this.startY, this.height, this.width);
            } else {
                this.drawWithPreview(this.startX, this.startY, this.width, this.height);
            }
        }
    }

    public static draw(
        drawData: RectDrawData,
        context: CanvasRenderingContext2D
    ) {
        const { rect, fillColor, strokeColor, mode } = drawData;

        context.fillStyle = fillColor;
        context.strokeStyle = strokeColor;
        context.beginPath();
        context.rect(rect.x, rect.y, rect.w, rect.h);
        if (mode === "fill") {
            context.fill();
        }
        context.stroke();
        context.beginPath();
    }

    private drawWithPreview(x: number, y: number, w: number, h: number) {
        const img = new Image();
        img.src = this.saved;
        img.onload = () => {
            this.context.fillStyle = this.fillColor;
            this.context.strokeStyle = this.mode === "solid" ? this.fillColor : this.strokeColor;


            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.context.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);

            this.context.beginPath();
            this.context.rect(x, y, w, h);

            if (this.mode === "fill" || this.mode === "solid") {
                this.context.fill();
            }
            this.context.stroke();
        };
    }
}

export default Rect;

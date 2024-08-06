import PaintSocket from "../socket/Socket";
import { CircleDrawData, Figures } from "../types/DrawData";
import { Settings } from "../types/Settings";
import Tool from "./Tool";

class Circle extends Tool {
    startX = 0;
    startY = 0;
    endX = 0;
    endY = 0;
    radiusX = 0;
    radiusY = 0;
    centerX = 0;
    centerY = 0;
    saved: string = "";

    isShiftPressed: boolean = false;

    constructor(canvas: HTMLCanvasElement, socket: PaintSocket) {
        super(canvas, socket);
        this.listenEvents();
        this.toolName = "Circle";
    }

    public override hasDrawProperty(setting: Settings): boolean {
        switch(setting) {
        case Settings.DRAW_MODE: return true;
        case Settings.LINE_WIDTH: return true;
        case Settings.STROKE_COLOR: return true;
        case Settings.FILL_COLOR: return true;
        case Settings.GENERAL_COLOR: return true;
        }
    }

    protected override listenEvents() {
        super.listenEvents();
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

        this.socket.sendDrawData({
            center: { x: this.centerX, y: this.centerY },
            radius: { x: this.radiusX, y: this.radiusY },
            mode: this.mode,
            figure: Figures.Circle,
            strokeColor: this.strokeColor,
            fillColor: this.fillColor,
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

            this.radiusX = Math.abs(this.endX - this.startX) / 2;
            this.radiusY = Math.abs(this.endY - this.startY) / 2;
            this.centerX = (this.endX + this.startX) / 2;
            this.centerY = (this.endY + this.startY) / 2;

            if (this.isShiftPressed) {
                this.radiusX =
          Math.sqrt(
              Math.pow(this.endX - this.startX, 2) +
              Math.pow(this.endY - this.startY, 2)
          ) / 2;
                this.radiusY = this.radiusX;
            }

            this.drawWithPreview();
        }
    }

    public static draw(
        drawData: CircleDrawData,
        context: CanvasRenderingContext2D
    ) {
        const {
            center,
            radius,
            rotation = 0,
            angle = { x: 0, y: Math.PI * 2 },
            mode,
            strokeColor,
            fillColor,
        } = drawData;

        context.fillStyle = fillColor;
        context.strokeStyle = strokeColor;

        context.beginPath();
        context.ellipse(
            center.x,
            center.y,
            radius.x,
            radius.y,
            rotation,
            angle.x,
            angle.y
        );
        if (mode === "fill") {
            context.fill();
        }
        context.stroke();
        context.beginPath();
    }

    private drawWithPreview() {
        const img = new Image();
        img.src = this.saved;
        img.onload = () => {
            this.context.fillStyle = this.fillColor;
            this.context.strokeStyle = this.mode === "solid" ? this.fillColor : this.strokeColor;


            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.context.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
            this.context.beginPath();
            this.context.ellipse(
                this.centerX,
                this.centerY,
                this.radiusX,
                this.radiusY,
                0,
                0,
                2 * Math.PI
            );
            if (this.mode === "fill" || this.mode === "solid") {
                this.context.fill();
            }
            this.context.stroke();
        };
    }
}

export default Circle;

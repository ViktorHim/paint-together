import PaintSocket from "../socket/Socket";
import SocketState from "../store/SocketState";
import { BucketDrawData, Figures } from "../types/DrawData";
import { Settings } from "../types/Settings";
import Tool from "./Tool";

type ColorRGBA = {
  r: number;
  g: number;
  b: number;
  a: number;
};

class Bucket extends Tool {
    constructor(canvas: HTMLCanvasElement) {
        super(canvas);
        this.listenEvents();
        this.toolName = "Bucket";
    }

    public override hasDrawProperty(setting: Settings): boolean {
        switch(setting) {
        case Settings.DRAW_MODE: return false;
        case Settings.LINE_WIDTH: return false;
        case Settings.STROKE_COLOR: return false;
        case Settings.FILL_COLOR: return true;
        case Settings.GENERAL_COLOR: return false;
        }
    }

    protected listenEvents() {
        super.listenEvents();
        this.canvas.onmousedown = this.mouseDownHandler.bind(this);
    }

    protected mouseDownHandler(event: MouseEvent) {
        this.isMouseDown = true;
        const x = this.getClickPosX(event);
        const y = this.getClickPosY(event);
        this.drawBroadcast(x, y);
    }

    private drawBroadcast(x: number, y: number) {
        const drawData: BucketDrawData = {
            point: { x, y },
            fillColor: this.fillColor,
            figure: Figures.Bucket,
        };

        Bucket.draw(drawData, this.canvas);
        SocketState.sendDraw(drawData);
    }

    private static getPixelColor(
        x: number,
        y: number,
        imageData: ImageData
    ): ColorRGBA {
        const index = (y * imageData.width + x) * 4;
        return {
            r: imageData.data[index],
            g: imageData.data[index + 1],
            b: imageData.data[index + 2],
            a: imageData.data[index + 3],
        };
    }

    private static setPixelColor(
        x: number,
        y: number,
        color: ColorRGBA,
        imageData: ImageData
    ) {
        const index = (y * imageData.width + x) * 4;

        imageData.data[index] = color.r;
        imageData.data[index + 1] = color.g;
        imageData.data[index + 2] = color.b;
        imageData.data[index + 3] = color.a;
    }

    private static colorsMatch(
        firstColor: ColorRGBA,
        secondColor: ColorRGBA,
        tolerance = 0
    ): boolean {
        return (
            Math.abs(firstColor.r - secondColor.r) <= tolerance &&
      Math.abs(firstColor.g - secondColor.g) <= tolerance &&
      Math.abs(firstColor.b - secondColor.b) <= tolerance &&
      Math.abs(firstColor.a - secondColor.a) <= tolerance
        );
    }

    private static hexToRgb(hexCode: string): ColorRGBA {
        const hex = hexCode.replace(/^#/, "");

        let r = 0,
            g = 0,
            b = 0,
            a = 0;

        r = parseInt(hex.substring(0, 2), 16);
        g = parseInt(hex.substring(2, 4), 16);
        b = parseInt(hex.substring(4, 6), 16);
        a = 255;

        return { r, g, b, a };
    }

    public static draw(drawData: BucketDrawData, canvas: HTMLCanvasElement) {
        const context = canvas.getContext("2d");
        const { point, fillColor } = drawData;

        if (context === null) return;

        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

        const fillColorRgb = Bucket.hexToRgb(fillColor as string);
        const targetColor = Bucket.getPixelColor(point.x, point.y, imageData);

        if (this.colorsMatch(targetColor, fillColorRgb)) {
            return;
        }

        const pixelStack = [{ x: point.x, y: point.y }];

        const addRightPixel = (x: number, y: number) => {
            if (x >= 0 && x <= canvas.width - 1 && y >= 0 && y <= canvas.height - 1) {
                pixelStack.push({ x, y });
            }
        };

        while (pixelStack.length > 0) {
            const { x, y } = pixelStack.pop()!;
            const currentColor = Bucket.getPixelColor(x, y, imageData);

            Bucket.setPixelColor(x, y, fillColorRgb, imageData);
            if (Bucket.colorsMatch(currentColor, targetColor)) {
                addRightPixel(x - 1, y);
                addRightPixel(x + 1, y);
                addRightPixel(x, y - 1);
                addRightPixel(x, y + 1);
            }
        }

        context.putImageData(imageData, 0, 0);
    }
}

export default Bucket;
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
  }

  private listenEvents() {
    this.canvas.onmousedown = this.mouseDownHandler.bind(this);
  }

  protected mouseDownHandler(event: MouseEvent) {
    this.isMouseDown = true;
    // this.context?.beginPath();холст
    console.log("click");

    const x = this.getClickPosX(event);
    const y = this.getClickPosY(event);
    this.draw(x, y);
  }

  private getPixelColor(x: number, y: number, imageData: ImageData): ColorRGBA {
    const index = (y * imageData.width + x) * 4;
    return {
      r: imageData.data[index],
      g: imageData.data[index + 1],
      b: imageData.data[index + 2],
      a: imageData.data[index + 3],
    };
  }

  private setPixelColor(
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

  private colorsMatch(
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

  private draw(x: number, y: number) {
    const imageData = this.context.getImageData(
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );

    const fillColor = this.hexToRgb(this.context.strokeStyle as string);
    const targetColor = this.getPixelColor(x, y, imageData);

    if (this.colorsMatch(targetColor, fillColor)) {
      return;
    }

    const pixelStack = [{ x, y }];

    const addRightPixel = (x: number, y: number) => {
      if (
        x >= 0 &&
        x <= this.canvas.width - 1 &&
        y >= 0 &&
        y <= this.canvas.height - 1
      ) {
        pixelStack.push({ x, y });
      }
    };

    while (pixelStack.length > 0) {
      const { x, y } = pixelStack.pop()!;
      const currentColor = this.getPixelColor(x, y, imageData);

      this.setPixelColor(x, y, fillColor, imageData);
      if (this.colorsMatch(currentColor, targetColor)) {
        addRightPixel(x - 1, y);
        addRightPixel(x + 1, y);
        addRightPixel(x, y - 1);
        addRightPixel(x, y + 1);
      }
    }

    this.context.putImageData(imageData, 0, 0);
  }

  hexToRgb(hexCode: string): ColorRGBA {
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
}

export default Bucket;

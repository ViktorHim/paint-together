import { makeAutoObservable } from "mobx";
import Tool, { drawMode } from "../tools/Tool";

class ToolState {
  tool: Tool | null = null;
  drawMode: drawMode = "border";
  fillColor: string = "000000";
  strokeColor: string = "000000";

  constructor() {
    makeAutoObservable(this);
  }

  setTool(tool: Tool) {
    this.tool = tool;
    this.tool.drawMode = this.drawMode;
    this.tool.FillColor = this.fillColor;
    this.tool.StrokeColor = this.strokeColor;
  }

  setDrawMode(mode: drawMode) {
    if (this.tool) {
      this.tool.drawMode = mode;
      this.drawMode = mode;
    }
  }

  setFillColor(color: string) {
    if (this.tool) {
      this.tool.FillColor = color;
      this.fillColor = color;
    }
  }

  getFillColor(): string {
    return this.fillColor;
  }

  setStrokeColor(color: string) {
    if (this.tool) {
      this.tool.StrokeColor = color;
      this.strokeColor = color;
    }
  }

  setLineWidth(width: number) {
    if (this.tool) {
      this.tool!.lineWidth = width;
    }
  }

  clearCanvas() {
    this.tool?.clear();
  }
}

export default new ToolState();

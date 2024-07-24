import { makeAutoObservable } from "mobx";
import Tool from "../tools/Tool";

class ToolState {
  tool?: Tool;

  constructor() {
    makeAutoObservable(this);
  }

  setTool(tool: Tool) {
    this.tool = tool;
  }

  setFillColor(color: string) {
    if (this.tool) {
      this.tool.fillColor = color;
    }
  }

  setStrokeColor(color: string) {
    if (this.tool) {
      this.tool.strokeColor = color;
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

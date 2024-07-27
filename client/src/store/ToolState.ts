import { makeAutoObservable } from "mobx";
import Tool, { drawMode } from "../tools/Tool";

class ToolState {
  tool?: Tool;

  constructor() {
    makeAutoObservable(this);
  }

  setTool(tool: Tool) {
    this.tool = tool;
  }

  setDrawMode(mode: drawMode) {
    if (this.tool) {
      this.tool.drawMode = mode;
    }
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
    console.log(color);
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

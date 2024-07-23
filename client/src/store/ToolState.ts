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
}

export default new ToolState();

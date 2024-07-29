import { drawMode } from "../tools/Tool";

export type DrawData = BrushDrawData | RectDrawData;

export interface BrushDrawData {
  x: number;
  y: number;
  figure: "brush";
}

export interface RectDrawData {
  x: number;
  y: number;
  width: number;
  height: number;
  mode: drawMode;
  figure: "rect";
}

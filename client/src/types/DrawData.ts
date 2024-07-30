import { drawMode } from "../tools/Tool";

export type DrawData =
  | BrushDrawData
  | LineDrawData
  | RectDrawData
  | CircleDrawData;

export enum Figures {
  Brush,
  Line,
  Rect,
  Circle,
}

type Color = string | CanvasGradient | CanvasPattern;

export interface BrushDrawData {
  x: number;
  y: number;
  strokeColor: Color;
  figure: Figures.Brush;
}

export interface LineDrawData {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  strokeColor: Color;
  figure: Figures.Line;
}

export interface RectDrawData {
  x: number;
  y: number;
  width: number;
  height: number;
  strokeColor: Color;
  fillColor: Color;
  mode: drawMode;
  figure: Figures.Rect;
}

export interface CircleDrawData {
  centerX: number;
  centerY: number;
  radiusX: number;
  radiusY: number;
  rotation?: number;
  startAngle?: number;
  endAngle?: number;
  mode: drawMode;
  strokeColor: Color;
  fillColor: Color;
  figure: Figures.Circle;
}

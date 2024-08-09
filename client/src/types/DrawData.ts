import { drawMode } from "../tools/Tool";
import { Point, Rectangle } from "./Shapes";

export type DrawData =
  | BrushDrawData
  | BucketDrawData
  | EraserDrawData
  | LineDrawData
  | RectDrawData
  | CircleDrawData;

export enum Figures {
  Brush,
  Bucket,
  Eraser,
  Line,
  Rect,
  Circle,
}

type Color = string | CanvasGradient | CanvasPattern;

export interface BrushDrawData {
  point: Point;
  strokeColor?: Color;
  lineWidth: number;
  figure: Figures.Brush | Figures.Eraser;
}

export interface EraserDrawData {
  point: Point;
  lineWidth: number;
  figure: Figures.Eraser;
}

export interface BucketDrawData {
  point: Point;
  fillColor: Color;
  figure: Figures.Bucket;
}

export interface LineDrawData {
  startPoint: Point;
  endPoint: Point;
  strokeColor: Color;
  lineWidth: number;
  figure: Figures.Line;
}

export interface RectDrawData {
  rect: Rectangle;
  strokeColor: Color;
  fillColor: Color;
  mode: drawMode;
  lineWidth: number;
  figure: Figures.Rect;
}

export interface CircleDrawData {
  center: Point;
  radius: Point;
  angle?: Point;
  rotation?: number;
  mode: drawMode;
  strokeColor: Color;
  fillColor: Color;
  lineWidth: number;
  figure: Figures.Circle;
}

import "../styles/toolbar.scss";

export enum ToolType {
  BRUSH = "brush",
  CIRCLE = "circle",
  LINE = "line",
  ERASER = "eraser",
  RECT = "rect",
  UNDO = "undo",
  REDO = "redo",
  SAVE = "save",
}

export interface ToolButtonProps {
  type: ToolType;
}

export const ToolButton = ({ type }: ToolButtonProps) => {
  return <button className={`toolbar_btn ${type}`}></button>;
};

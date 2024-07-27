import CanvasState from "../store/CanvasState";
import ToolState from "../store/ToolState";
import "../styles/toolbar.scss";
import Tool from "../tools/Tool";

export enum ToolType {
  BRUSH = "brush",
  CIRCLE = "circle",
  LINE = "line",
  ERASER = "eraser",
  RECT = "rect",
  BUCKET = "bucket",
  UNDO = "undo",
  REDO = "redo",
  SAVE = "save",
}

export interface ToolButtonProps {
  type: ToolType;
  toolClass: new (canvas: HTMLCanvasElement) => Tool;
  isSelected: boolean;
  onClick: (id: number) => void;
  id: number;
}

export const ToolButton = ({
  type,
  toolClass,
  onClick,
  isSelected,
  id,
}: ToolButtonProps) => {
  const onClickHandler = () => {
    ToolState.setTool(new toolClass(CanvasState.canvas as HTMLCanvasElement));
    onClick(id);
  };

  return (
    <button
      className={`toolbar_btn ${type} ${isSelected ? "active" : ""}`}
      onClick={onClickHandler}
    ></button>
  );
};

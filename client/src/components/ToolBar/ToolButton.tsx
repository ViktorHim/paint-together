import cls from "./toolbar.module.scss";
import ToolState from "../../store/ToolState";
import CanvasState from "../../store/CanvasState";
import Brush from "../../tools/Brush";
import Bucket from "../../tools/Bucket";
import Circle from "../../tools/Circle";
import Eraser from "../../tools/Eraser";
import Line from "../../tools/Line";
import Rect from "../../tools/Rect";

export enum ToolType {
  BRUSH = "brush",
  CIRCLE = "circle",
  LINE = "line",
  ERASER = "eraser",
  RECT = "rect",
  BUCKET = "bucket",
  // UNDO = "undo",
  // REDO = "redo",
  // SAVE = "save",
}

export interface ToolButtonProps {
  type: ToolType;
}

const ToolConstructor = {
    [ToolType.BRUSH] : Brush,
    [ToolType.BUCKET]: Bucket,
    [ToolType.CIRCLE]: Circle,
    [ToolType.ERASER]: Eraser,
    [ToolType.LINE]: Line,
    [ToolType.RECT]: Rect,

}

export const ToolButton = ({
    type,
}: ToolButtonProps) => {
    const onClickHandler = () => {
        ToolState.setTool(
            new ToolConstructor[type](
        CanvasState.canvas!,
            )
        );
    };

    return (
        <button
            className={`${cls.toolbar_btn} ${cls[type]}`}
            onClick={onClickHandler}
        ></button>
    );
};

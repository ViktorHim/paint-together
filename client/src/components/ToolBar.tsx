import "../styles/toolbar.scss";
import { ToolButton, ToolType } from "./ToolButton";

export const ToolBar = () => {
  return (
    <div className="toolbar">
      <div className="paint-tools">
        <ToolButton type={ToolType.BRUSH} />
        <ToolButton type={ToolType.LINE} />
        <ToolButton type={ToolType.RECT} />
        <ToolButton type={ToolType.CIRCLE} />
        <ToolButton type={ToolType.ERASER} />
        <input type="color" />
      </div>
      <div className="save-tools">
        <ToolButton type={ToolType.UNDO} />
        <ToolButton type={ToolType.REDO} />
        <ToolButton type={ToolType.SAVE} />
      </div>
    </div>
  );
};

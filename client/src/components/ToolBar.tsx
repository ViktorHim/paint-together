import { useState } from "react";
import "../styles/toolbar.scss";
import Brush from "../tools/Brush";
import { ToolButton, ToolType } from "./ToolButton";
import Rect from "../tools/Rect";
import Line from "../tools/Line";
import Eraser from "../tools/Eraser";
import CanvasState from "../store/CanvasState";
import { observer } from "mobx-react-lite";
import Circle from "../tools/Circle";
import Bucket from "../tools/Bucket";

const paintTools = [
  { type: ToolType.BRUSH, toolClass: Brush },
  { type: ToolType.LINE, toolClass: Line },
  { type: ToolType.RECT, toolClass: Rect },
  { type: ToolType.CIRCLE, toolClass: Circle },
  { type: ToolType.ERASER, toolClass: Eraser },
  { type: ToolType.BUCKET, toolClass: Bucket },
];

export const ToolBar = observer(() => {
  const [selectedId, setSelectedId] = useState<number>(0);

  const onSelectToolHandler = (id: number) => {
    setSelectedId(id);
  };

  return (
    <div className="toolbar">
      <div className="paint-tools">
        {paintTools.map((tool, index) => (
          <ToolButton
            key={index}
            id={index}
            type={tool.type}
            toolClass={tool.toolClass}
            isSelected={selectedId === index}
            onClick={onSelectToolHandler}
          />
        ))}
        {/* <input type="color" /> */}
      </div>
      <div className="save-tools">
        <button
          className="toolbar_btn undo"
          onClick={() => CanvasState.undo()}
          disabled={!CanvasState.canUndo()}
        />
        <button
          className="toolbar_btn redo"
          onClick={() => CanvasState.redo()}
          disabled={!CanvasState.canRedo()}
        />
        <button className="toolbar_btn save" />
      </div>
    </div>
  );
});

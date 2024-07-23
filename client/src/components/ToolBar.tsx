import { useState } from "react";
import "../styles/toolbar.scss";
import Brush from "../tools/Brush";
import { ToolButton, ToolType } from "./ToolButton";
import Rect from "../tools/Rect";

const paintTools = [
  { type: ToolType.BRUSH, toolClass: Brush },
  { type: ToolType.LINE, toolClass: Brush },
  { type: ToolType.RECT, toolClass: Rect },
  { type: ToolType.CIRCLE, toolClass: Brush },
  { type: ToolType.ERASER, toolClass: Brush },
];

export const ToolBar = () => {
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
        {/* <ToolButton type={ToolType.UNDO} />
        <ToolButton type={ToolType.REDO} />
        <ToolButton type={ToolType.SAVE} /> */}
      </div>
    </div>
  );
};

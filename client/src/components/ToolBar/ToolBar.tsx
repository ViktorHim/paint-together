import { useState } from "react";
import cls from "./toolbar.module.scss";
import { ToolButton, ToolType } from "./ToolButton";
import { observer } from "mobx-react-lite";
import CanvasState from "../../store/CanvasState";
import { ToolList } from "./ToolList";

export const ToolBar = observer(() => {
    const [selectedType, setSelectedType] = useState<ToolType>(ToolType.BRUSH);

    const onSelectToolHandler = (toolType: ToolType) => {
        setSelectedType(toolType);
    };

    const onSaveHandler = () => {};

    return (
        <div className={cls.toolbar}>
            <div className={cls.tool_group}>
                <ToolList classname={cls.shapes} title="Shapes" onSelect={onSelectToolHandler} selectedTool={selectedType}>
                    <ToolButton type={ToolType.LINE}/>
                    <ToolButton type={ToolType.CIRCLE}/>
                    <ToolButton type={ToolType.RECT}/>
                </ToolList>
                <ToolList title="Tools" onSelect={onSelectToolHandler} selectedTool={selectedType}>
                    <ToolButton type={ToolType.BRUSH}/>
                    <ToolButton type={ToolType.BUCKET}/>
                    <ToolButton type={ToolType.ERASER}/>
                </ToolList>
            </div>
            <div className={cls.tool_group}>
                <button
                    className={[cls.toolbar_btn, cls.undo].join(" ")}
                    onClick={() => CanvasState.undo()}
                    disabled={!CanvasState.canUndo()}
                />
                <button
                    className={[cls.toolbar_btn, cls.redo].join(" ")}
                    onClick={() => CanvasState.redo()}
                    disabled={!CanvasState.canRedo()}
                />
                <button
                    className={[cls.toolbar_btn, cls.save].join(" ")}
                    onClick={onSaveHandler}
                />
            </div>
        </div>
    );
});

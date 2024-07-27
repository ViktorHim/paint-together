import { observer } from "mobx-react-lite";
import CanvasState from "../store/CanvasState";
import ToolState from "../store/ToolState";
import cls from "../styles/status_bar.module.scss";

export const StatusBar = observer(() => {
  const position = CanvasState.cursorPosition;
  return (
    <div className={cls.status_bar}>
      <div className={cls.position}>
        Cursor position:
        {position ? ` x: ${position.x} y: ${position.y}` : ""}
      </div>
      <div className="">
        {`Size: ${CanvasState.canvas?.width} x ${CanvasState.canvas?.height}`}
      </div>
    </div>
  );
});

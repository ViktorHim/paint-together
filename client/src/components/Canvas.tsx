import { observer } from "mobx-react-lite";
import cls from "../styles/canvas.module.scss";
import { useEffect, useRef } from "react";
import CanvasState from "../store/CanvasState";

export const Canvas = observer(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    CanvasState.setCanvas(canvasRef.current as HTMLCanvasElement);
  }, []);

  const onMouseDownHandler = () => {
    CanvasState.pushToUndo(canvasRef.current!.toDataURL());
  };

  const onMouseMoveHandler = (event: any) => {
    const x = event.pageX - (event.target as HTMLElement).offsetLeft;
    const y = event.pageY - (event.target as HTMLElement).offsetTop;
    CanvasState.setCursorPosition(x, y);
  };

  const onMouseLeaveHandler = (event: any) => {
    CanvasState.clearCursorPosition();
  };

  return (
    <div className={cls.canvas}>
      <canvas
        onMouseDown={onMouseDownHandler}
        onMouseMove={onMouseMoveHandler}
        onMouseLeave={onMouseLeaveHandler}
        ref={canvasRef}
        height={600}
        width={900}
      />
    </div>
  );
});

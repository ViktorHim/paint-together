import { observer } from "mobx-react-lite";
import cls from "../styles/canvas.module.scss";
import { useCallback, useEffect, useRef } from "react";
import CanvasState from "../store/CanvasState";
import SocketState from "../store/SocketState";
import ToolState from "../store/ToolState";
import { useParams } from "react-router-dom";
import Brush from "../tools/Brush";
import { throttle } from "../helpers/throttle";

export const Canvas = observer(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { id } = useParams();

  useEffect(() => {
    CanvasState.setCanvas(canvasRef.current as HTMLCanvasElement);
  }, []);

  useEffect(() => {
    if (SocketState.username) {
      const socket = new WebSocket("ws://localhost:5000/");
      SocketState.setId(id!);
      SocketState.setCanvas(CanvasState.canvas!);
      SocketState.initSocket(socket);

      ToolState.setTool(
        new Brush(CanvasState.canvas as HTMLCanvasElement, SocketState.socket!)
      );
    }
  }, [SocketState.username]);

  const onMouseDownHandler = () => {
    CanvasState.pushToUndo(canvasRef.current!.toDataURL());
  };

  const sendCursor = useCallback(
    throttle(
      (x: number, y: number) => SocketState.socket?.sendCursor({ x, y }),
      100
    ),
    []
  );

  const onMouseMoveHandler = (event: any) => {
    const x = event.pageX - (event.target as HTMLElement).offsetLeft;
    const y = event.pageY - (event.target as HTMLElement).offsetTop;
    // CanvasState.setCursorPosition(x, y);
    sendCursor(x, y);
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

import { observer } from "mobx-react-lite";
import cls from "../styles/canvas.module.scss";
import { useEffect, useRef } from "react";
import CanvasState from "../store/CanvasState";
import ToolState from "../store/ToolState";
import Brush from "../tools/Brush";

export const Canvas = observer(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    CanvasState.setCanvas(canvasRef.current as HTMLCanvasElement);
    ToolState.setTool(new Brush(canvasRef.current as HTMLCanvasElement));
  }, []);
  return (
    <div className={cls.canvas}>
      <canvas ref={canvasRef} height={600} width={900} />
    </div>
  );
});
//H5dk82i22j

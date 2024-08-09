import { observer } from "mobx-react-lite";
import cls from "./canvas.module.scss";
import { useCallback, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import CanvasState from "../../store/CanvasState";
import SocketState from "../../store/SocketState";
import { throttle } from "../../helpers/throttle";

export const Canvas = observer(() => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { id } = useParams();

    useEffect(() => {
        if(!SocketState.Canvas) {
            CanvasState.setCanvas(canvasRef.current as HTMLCanvasElement);
            SocketState.Canvas = canvasRef.current as HTMLCanvasElement;
        }
        if(id) SocketState.Id = id;
    }, [id]);

    const onMouseDownHandler = () => {
        CanvasState.pushToUndo(canvasRef.current!.toDataURL());
    };

    const sendCursor = useCallback(
        throttle(
            (x: number, y: number) => SocketState.sendCursor({ x, y }),
            100
        ),
        []
    );

    const onMouseMoveHandler = (event: any) => {
        const x = event.pageX - (event.target as HTMLElement).offsetLeft;
        const y = event.pageY - (event.target as HTMLElement).offsetTop;
        sendCursor(x, y);
    };

    const onMouseLeaveHandler = (event: any) => {
        CanvasState.clearCursorPosition();
    };

    return (
        <div className={cls.canvas_container}>
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

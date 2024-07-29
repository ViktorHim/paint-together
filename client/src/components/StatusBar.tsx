import { observer } from "mobx-react-lite";
import CanvasState from "../store/CanvasState";
import cls from "../styles/status_bar.module.scss";
import SocketState from "../store/SocketState";

export const StatusBar = observer(() => {
  const position = CanvasState.cursorPosition;

  const onConnectionHandler = () => {
    SocketState.setUsername(`viktor${Math.floor(Math.random() * 10000)}`);
  };

  return (
    <div className={cls.status_bar}>
      <div className={cls.position}>
        Cursor position:
        {position ? ` x: ${position.x} y: ${position.y}` : ""}
      </div>
      <div className="">
        {`Size: ${CanvasState.canvas?.width} x ${CanvasState.canvas?.height}`}
      </div>
      <button onClick={onConnectionHandler}>Войти</button>
    </div>
  );
});

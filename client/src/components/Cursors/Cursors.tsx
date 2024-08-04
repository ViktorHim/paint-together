import { observer } from "mobx-react-lite";
import cls from "./cursors.module.scss";
import SocketState from "../../store/SocketState";
import CanvasState from "../../store/CanvasState";

export const Cursors = observer(() => {
  return (
    !!SocketState.Cursors &&
    Object.values(SocketState.Cursors!).map((point) => (
      <div
        key={point.x}
        className={cls.cursor}
        style={{
          left: `${point.x + (CanvasState.canvas as HTMLElement).offsetLeft}px`,
          top: `${point.y + (CanvasState.canvas as HTMLElement).offsetTop}px`,
        }}
      >
        <div className={cls.cursor_container}>
          <div className={[cls.cross_line, cls.vertical].join(" ")}></div>
          <div className={[cls.cross_line, cls.horizontal].join(" ")}></div>
        </div>
      </div>
    ))
  );
});

import { observer } from "mobx-react-lite";
import "../styles/cursors.scss";
import SocketState from "../store/SocketState";
import CanvasState from "../store/CanvasState";

export const Cursors = observer(() => {
  return (
    !!SocketState.Cursors &&
    Object.values(SocketState.Cursors!).map((point) => (
      <div
        key={point.x}
        className="cursor"
        style={{
          left: `${point.x + (CanvasState.canvas as HTMLElement).offsetLeft}px`,
          top: `${point.y + (CanvasState.canvas as HTMLElement).offsetTop}px`,
        }}
      >
        <div className="cursor-container">
          <div className="cross-line vertical"></div>
          <div className="cross-line horizontal"></div>
        </div>
      </div>
    ))
  );
});

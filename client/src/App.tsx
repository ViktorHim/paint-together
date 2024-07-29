import { Navigate, Route, Routes, useParams } from "react-router-dom";
import { Canvas } from "./components/Canvas";
import { SettingBar } from "./components/SettingBar";
import { StatusBar } from "./components/StatusBar";
import { ToolBar } from "./components/ToolBar";
import "./styles/app.scss";
import { useEffect } from "react";
import CanvasState from "./store/CanvasState";
import { observer } from "mobx-react-lite";
import SocketState from "./store/SocketState";
import ToolState from "./store/ToolState";
import Brush from "./tools/Brush";

export const App = observer(() => {
  const { id } = useParams();

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

  return (
    <div className="app">
      <Routes>
        <Route
          path={"/:id"}
          element={
            <>
              <ToolBar />
              <SettingBar />
              <Canvas />
              <StatusBar />
            </>
          }
        />
        <Route
          path={"/"}
          element={<Navigate to={`/f${(+new Date()).toString(16)}`} />}
        />
      </Routes>
    </div>
  );
});

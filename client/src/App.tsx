import { Navigate, Route, Routes } from "react-router-dom";
import { Canvas } from "./components/Canvas";
import { SettingBar } from "./components/SettingBar";
import { StatusBar } from "./components/StatusBar";
import { ToolBar } from "./components/ToolBar";
import "./styles/app.scss";
import { Cursors } from "./components/Cursors";

export const App = () => {
  return (
    <div className="app">
      <Routes>
        <Route
          path={"/paint/:id"}
          element={
            <>
              <ToolBar />
              <SettingBar />
              <Canvas />
              <StatusBar />
              <Cursors />
            </>
          }
        />
        <Route
          path={"/"}
          element={<Navigate to={`/paint/room${(+new Date()).toString(16)}`} />}
        />
      </Routes>
    </div>
  );
};

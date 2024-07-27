import { Canvas } from "./components/Canvas";
import { SettingBar } from "./components/SettingBar";
import { StatusBar } from "./components/StatusBar";
import { ToolBar } from "./components/ToolBar";
import "./styles/app.scss";

export const App = () => {
  return (
    <div className="app">
      <ToolBar />
      <SettingBar />
      <Canvas />
      <StatusBar />
    </div>
  );
};

import ToolState from "../store/ToolState";
import cls from "../styles/setting_bar.module.scss";

export const SettingBar = () => {
  return (
    <div className={cls.setting_bar}>
      <label htmlFor="lineWidth">Толщина линии</label>
      <input
        id="lineWidth"
        type="number"
        defaultValue={1}
        min={1}
        max={50}
        onChange={(e) => ToolState.setLineWidth(Number(e.target.value))}
      />

      <label htmlFor="color">Цвет</label>
      <input
        id="color"
        type="color"
        onChange={(e) => ToolState.setStrokeColor(e.target.value)}
      />

      <button onClick={() => ToolState.clearCanvas()}>Очистить холст</button>
    </div>
  );
};

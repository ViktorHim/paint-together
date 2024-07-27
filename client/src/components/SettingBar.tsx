import ToolState from "../store/ToolState";
import cls from "../styles/setting_bar.module.scss";
import { drawMode } from "../tools/Tool";

export const SettingBar = () => {
  return (
    <div className={cls.setting_bar}>
      <div className={cls.setting_bar_left}>
        <div>
          <label htmlFor="lineWidth" className={cls.label}>
            Толщина линии
          </label>
          <input
            id="lineWidth"
            type="number"
            defaultValue={1}
            min={1}
            max={50}
            onChange={(e) => ToolState.setLineWidth(Number(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor="mode" className={cls.label}>
            Режим заполнения
          </label>
          <select
            name="mode"
            id="mode"
            defaultValue={"border"}
            onChange={(e) => ToolState.setDrawMode(e.target.value as drawMode)}
          >
            <option value="fill">Заливка</option>
            <option value="border">Обводка</option>
          </select>
        </div>
        <div>
          <label htmlFor="color" className={cls.label}>
            Цвет
          </label>
          <input
            id="color"
            type="color"
            onChange={(e) => ToolState.setStrokeColor(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="color" className={cls.label}>
            Цвет заливки
          </label>
          <input
            id="color"
            type="color"
            onChange={(e) => ToolState.setFillColor(e.target.value)}
          />
        </div>
      </div>

      <button onClick={() => ToolState.clearCanvas()}>Очистить холст</button>
    </div>
  );
};

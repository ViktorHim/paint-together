import { observer } from "mobx-react-lite";
import cls from "./setting_bar.module.scss";
import ToolState from "../../store/ToolState";
import SocketState from "../../store/SocketState";
import { drawMode } from "../../tools/Tool";
import { ColorSetting } from "./ColorSetting";

export const SettingBar = observer(() => {
    return (
        <div className={cls.setting_bar}>
            <ul className={cls.setting_bar_list}>
                <li>
                    <label htmlFor="lineWidth" className={cls.label}>
                        Line width
                    </label>
                    <input
                        id="lineWidth"
                        type="number"
                        defaultValue={1}
                        min={1}
                        max={50}
                        onChange={(e) => ToolState.setLineWidth(Number(e.target.value))}
                    />
                </li>
                <li>
                    <label htmlFor="mode" className={cls.label}>
                        draw mode
                    </label>
                    <select
                        name="mode"
                        id="mode"
                        defaultValue={"border"}
                        onChange={(e) => ToolState.setDrawMode(e.target.value as drawMode)}
                    >
                        <option value="fill">Fill</option>
                        <option value="stroke">Stroke</option>
                        <option value="solid">Solid</option>
                    </select>
                </li>
                <li>
                    <ColorSetting
                        label="Stroke Color"
                        id="stroke"
                        onChange={(e) => ToolState.setStrokeColor(e.target.value)}
                    />
                </li>
                <li>
                    <ColorSetting
                        label="Fill Color"
                        id="fill"
                        onChange={(e) => ToolState.setFillColor(e.target.value)}
                    />
                </li>
                <li>
                    <ColorSetting
                        label="Color"
                        id="solid"
                        onChange={(e) => {
                            ToolState.setFillColor(e.target.value);
                            ToolState.setStrokeColor(e.target.value);
                        }}
                    />
                </li>
            </ul>
            
            <button className={cls.clear} onClick={() => SocketState.socket?.sendClear()}>
                Clear canvas
            </button>
        </div>
    );
});

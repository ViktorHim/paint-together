import { observer } from "mobx-react-lite";
import cls from "./setting_bar.module.scss";
import ToolState from "../../store/ToolState";
import SocketState from "../../store/SocketState";
import { Button } from "../../ui/Button/Button";
import { Input, InputThemes } from "../../ui/Input/Input";
import { Select } from "../../ui/Select/Select";
import { Option } from "../../ui/Select/Option";
import { SettingList } from "./SettingList";
import { Palette } from "../Pallete/Palette";
import { Settings } from "../../types/Settings";

export const SettingBar = observer(() => {
    const changeStrokeColor = (color: string) => {
        ToolState.setStrokeColor(color);
    }

    const changeFillColor = (color: string) => {
        ToolState.setFillColor(color);
    }

    const changeColor = (color: string) => {
        ToolState.setFillColor(color);
        ToolState.setStrokeColor(color);
    }

    const changeDrawMode = (event: any) => {
        ToolState.setDrawMode(event.target.value);
    }

    const changeLineWidth = (event: any) => {
        ToolState.setLineWidth(Number(event.target.value));
    }
    return (
        <div className={cls.setting_bar}>
            <strong>{ToolState.getToolName()}</strong>
            <SettingList>
                <Input
                    value={ToolState.lineWidth.toString()}
                    label="Line Width"
                    name={Settings.LINE_WIDTH}
                    type="number"
                    defaultValue={1}
                    min={1}
                    max={50}
                    onChange={changeLineWidth}
                />
                <Select
                    value={ToolState.drawMode}
                    label="Draw mode"
                    name={Settings.DRAW_MODE}
                    id="mode"
                    defaultValue={"border"}
                    onChange={changeDrawMode}
                >
                    <Option value="fill">Fill</Option>
                    <Option value="border">Stroke</Option>
                    <Option value="solid">Solid</Option>
                </Select>
                <Input
                    theme={InputThemes.COLOR}
                    className={cls.color}
                    type="color"
                    label="Stroke Color"
                    name={Settings.STROKE_COLOR}
                    value={ToolState.strokeColor}
                    onChange={(e) => changeStrokeColor(e.target.value)}
                />
                <Palette name={Settings.STROKE_COLOR} onSelect={changeStrokeColor}/>
                <Input
                    theme={InputThemes.COLOR}
                    className={cls.color}
                    type="color"
                    label="Fill Color"
                    name={Settings.FILL_COLOR}
                    value={ToolState.fillColor}
                    onChange={(e) => changeFillColor(e.target.value)}
                />
                <Palette name={Settings.FILL_COLOR} onSelect={changeFillColor}/>
                <Input
                    theme={InputThemes.COLOR}
                    className={cls.color}
                    type="color"
                    label="Color"
                    name={Settings.GENERAL_COLOR}
                    value={ToolState.fillColor}
                    onChange={(e) => changeColor(e.target.value)}
                />
                <Palette name={Settings.GENERAL_COLOR} onSelect={changeColor}/>

            </SettingList>
            <Button className={cls.clear} onClick={() => SocketState.socket?.sendClear()}>
                Clear canvas
            </Button>
        </div>
    );
});

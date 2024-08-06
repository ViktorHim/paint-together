import { observer } from "mobx-react-lite";
import cls from "./setting_bar.module.scss";
import ToolState from "../../store/ToolState";
import SocketState from "../../store/SocketState";
import { Button } from "../../ui/Button/Button";
import { Input } from "../../ui/Input/Input";
import { Select } from "../../ui/Select/Select";
import { Option } from "../../ui/Select/Option";
import { SettingList } from "./SettingList";

export const SettingBar = observer(() => {
    const changeStrokeColor = (event: any) => {
        ToolState.setStrokeColor(event.target.value);
    }

    const changeFillColor = (event: any) => {
        ToolState.setFillColor(event.target.value);
    }

    const changeColor = (event: any) => {
        ToolState.setFillColor(event.target.value);
        ToolState.setStrokeColor(event.target.value);
    }

    const changeDrawMode = (event: any) => {
        ToolState.setDrawMode(event.target.value);
    }

    const changeLineWidth = (event: any) => {
        ToolState.setLineWidth(Number(event.target.value));
    }

    return (
        <div className={cls.setting_bar}>
            <SettingList>
                <Input
                    label="Line Width"
                    name="lineWidth"
                    type="number"
                    defaultValue={1}
                    min={1}
                    max={50}
                    onChange={changeLineWidth}
                />
                <Select
                    label="Draw mode"
                    name="mode"
                    id="mode"
                    defaultValue={"border"}
                    onChange={changeDrawMode}
                >
                    <Option value="fill">Fill</Option>
                    <Option value="stroke">Stroke</Option>
                    <Option value="solid">Solid</Option>
                </Select>
                <Input
                    className={cls.color}
                    type="color"
                    label="Stroke Color"
                    name="stroke"
                    onChange={changeStrokeColor}
                />
                <Input
                    className={cls.color}
                    type="color"
                    label="Fill Color"
                    name="fill"
                    onChange={changeFillColor}
                />
                <Input
                    className={cls.color}
                    type="color"
                    label="Color"
                    name="solid"
                    onChange={changeColor}
                />
            </SettingList>
            <Button className={cls.clear} onClick={() => SocketState.socket?.sendClear()}>
                Clear canvas
            </Button>
        </div>
    );
});

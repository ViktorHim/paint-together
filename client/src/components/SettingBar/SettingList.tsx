import { Children, isValidElement, ReactNode } from "react";
import cls from "./setting_bar.module.scss";
import ToolState from "../../store/ToolState";
import { observer } from "mobx-react-lite";

export interface SettingListProps {
    children: ReactNode;

}

export const SettingList = observer(({children} : SettingListProps) => {

    return (
        <ul className={cls.setting_bar_list}>
            {Children.map(children, (child, index) => {
                if(isValidElement(child)) {
                    if(ToolState.toolHasSetting(child.props.name)) {
                        return <li key={index}>{child}</li>
                    }
                }
            })}
        </ul>
    )
})
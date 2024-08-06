import { Children, ReactNode } from "react";
import cls from "./setting_bar.module.scss";

export interface SettingListProps {
    children: ReactNode;

}

export const SettingList = ({children} : SettingListProps) => {

    return (
        <ul className={cls.setting_bar_list}>
            {Children.map(children, (child, index) => (
                <li key={index}>{child}</li>
            ))}
        </ul>
    )
}
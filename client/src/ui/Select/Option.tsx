import { ReactNode } from "react";
import cls from "./Select.module.scss";
export interface OptionProps {
    value: string;
    classname?: string;
    children: ReactNode;
}

export const Option = ({value, classname, children} : OptionProps) => {

    return (
        <option value={value} className={[classname, cls.option].join(" ")}>
            {children}
        </option>
    )
}
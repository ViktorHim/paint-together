import {ReactNode, SelectHTMLAttributes } from "react";
import cls from "./Select.module.scss"

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    classname?: string;
    label: string;
    name: string;
    children: ReactNode;
}

export const Select = ({label, className, name, children, ...others}: SelectProps) => {
    return (
        <>
            <label htmlFor={name} className={cls.label}>
                {label}
            </label>
            <select
                name={name}
                id={name}
                className={[className, cls.select].join(" ")}
                {...others}
            >
                {children}
            </select>
        </>
    )

}
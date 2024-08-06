import {InputHTMLAttributes, ReactNode } from "react";
import cls from "./Input.module.scss"


export enum InputThemes {
    DEFAULT = "default",
    COLOR = "color",
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    classname?: string;
    label: string;
    name: string;
    value?: string;
    theme?: InputThemes;
}


export const Input = ({className, name, label, value, theme = InputThemes.DEFAULT, ...others}: InputProps) => {
    return (
        <>
            <label htmlFor={name} className={cls.label}>
                {label}
            </label>
            <input
                value={value}
                id={name}
                name={name}
                className={[className, cls.input, cls[theme]].join(" ")}
                {...others}
            />
        </>
    )
} 
import {InputHTMLAttributes, ReactNode } from "react";
import cls from "./Input.module.scss"

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    classname?: string;
    label: string;
    name: string;
}


export const Input = ({className, name, label, ...others}: InputProps) => {
    return (
        <>
            <label htmlFor={name} className={cls.label}>
                {label}
            </label>
            <input
                id={name}
                name={name}
                className={[className, cls.input].join(" ")}
                {...others}
            />
        </>
    )
} 
import { ButtonHTMLAttributes, ReactNode } from "react";
import cls from "./Buttom.module.scss"

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    classname?: string;
}


export const Button = ({children, className, ...others}: ButtonProps) => {
    return (
        <button
            className={[className, cls.button].join(" ")}
            {...others}
        >
            {children}
        </button>
    )
} 
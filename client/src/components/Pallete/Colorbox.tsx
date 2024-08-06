import cls from "./palette.module.scss";
export interface ColorboxProps {
    color: string;
    onClick: () => void;
}

export const Colorbox = ({color, onClick} : ColorboxProps) => {
    return <div onClick={onClick} className={cls.color_box} style={{backgroundColor: color}}/>
}
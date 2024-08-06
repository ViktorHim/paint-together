import { Colorbox } from "./Colorbox";
import cls from "./palette.module.scss";

export interface PalleteProps {
    onSelect: (color: string) => void;
    classname?: string;
    name: string;
}

const colors = ["#fc1303", "#fc6603", "#fcdf03", "#d7fc03", "#30fc03", "#000000", "#03fcb1","#03fcd7", "#0324fc", "#8803fc", "#fc03d7", "#ffffff"];


export const Palette = ({onSelect, name}: PalleteProps) => {

    const onSelectColor = (index: number) => {
        onSelect(colors[index]);
    }

    return (
        <div id={name} className={cls.palette}>
            {colors.map((color, index) => (
                <Colorbox key={color} color={color} onClick={() => onSelectColor(index)}/>
            ))}
        </div>
    )
}
import React, { FC, isValidElement, ReactNode } from "react";
import cls from "./toolbar.module.scss";
import { ToolType } from "./ToolButton";

export interface ToolListProps {
    children: ReactNode;
    title: string;
    onSelect: (toolType: ToolType) => void;
    selectedTool: ToolType;
    classname?: string;
}


export const ToolList: FC<ToolListProps> = ({children, title, classname, onSelect, selectedTool}) => {

    return (
        <div className={[cls.tool_list, classname].join(" ")}>
            <p>{title}</p>
            <ul>
                {React.Children.map(children, (child, index) => {
                    if (isValidElement(child)){
                        return <li
                            className={`${selectedTool === child.props.type ? cls.active : ""}`}
                            onClick={() => onSelect(child.props.type)}
                            key={index}>
                            {child}
                        </li>
                    }
                })
                }
            </ul>
        </div>
    )
}
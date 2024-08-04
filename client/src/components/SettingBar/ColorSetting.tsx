import cls from "./setting_bar.module.scss";


export interface ColorSettingProps {
    onChange: (e : any) => any;
    label: string;
    id: string;
}


export const ColorSetting = ({onChange, id, label}: ColorSettingProps) => {

    return (
        <>
            <label htmlFor={id} className={cls.label}>
                {label}
            </label>
            <input
                id={id}
                type="color"
                onChange={onChange}
            />
        </>
    )
}
import { ReactNode } from "react";
import cls from "./modal.module.scss";
import SocketState from "../../store/SocketState";
import { observer } from "mobx-react-lite";

export interface ModalProps {
    children: ReactNode;

}

export const Modal = observer(({children} : ModalProps) => {

    if (SocketState.username) return null;

    return (
        <div className={cls.modal_overlay}>
            <div className={cls.modal_container}>
                {children}
            </div>
        </div>)
})
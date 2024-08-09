import { ReactNode } from "react";
import cls from "./modal.module.scss";
import SocketState from "../../store/SocketState";
import { observer } from "mobx-react-lite";
import { Button } from "../../ui/Button/Button";
import { useNavigate } from "react-router-dom";
import { createRoomId } from "../../helpers/createRoomId";

export interface ModalProps {
    children: ReactNode;

}

export const Modal = observer(({children} : ModalProps) => {

    const navigate = useNavigate();
    const onChangeRoomHandler = () => {
        navigate(`/paint/room${createRoomId()}`);
    }

    if (SocketState.Username) return null;

    return (
        <div className={cls.modal_overlay}>
            <div className={cls.modal_container}>
                {children}
                <Button className={cls.change} onClick={onChangeRoomHandler}>Change room</Button>
            </div>
        </div>)
})
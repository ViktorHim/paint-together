import { observer } from "mobx-react-lite";
import cls from "./status_bar.module.scss";
import CanvasState from "../../store/CanvasState";
import SocketState from "../../store/SocketState";
import { Button } from "../../ui/Button/Button";

export const StatusBar = observer(() => {
    const position = CanvasState.cursorPosition;

    const onConnectionHandler = () => {
        SocketState.setUsername(`viktor${Math.floor(Math.random() * 10000)}`);
    };

    return (
        <div className={cls.status_bar}>
            <Button>
                Sign out
            </Button>
            <Button>
                Share link
            </Button>
            <Button onClick={() => SocketState.socket?.sendClear()}>
                Clear canvas
            </Button>

        </div>
    );
});

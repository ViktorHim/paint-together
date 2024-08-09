import { observer } from "mobx-react-lite";
import cls from "./status_bar.module.scss";
import SocketState from "../../store/SocketState";
import { Button } from "../../ui/Button/Button";
import { toast } from "react-toastify";

export const StatusBar = observer(() => {

    const shareLinkHandler = () => {
        const currentURL = window.location.href;

        navigator.clipboard.writeText(currentURL)
            .then(() => toast.success("Link was copied!"));
    }

    const clearHandler = () => {
        SocketState.sendClear();
    }

    const logoutHandler = () => {
        SocketState.disconnect();
    }

    return (
        <div className={cls.status_bar}>
            <Button onClick={logoutHandler}>
                Logout
            </Button>
            <Button onClick={shareLinkHandler}>
                Share link
            </Button>
            <Button onClick={clearHandler}>
                Clear canvas
            </Button>

        </div>
    );
});

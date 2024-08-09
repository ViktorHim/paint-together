import { useState } from "react";
import { Button } from "../../ui/Button/Button"
import { Input } from "../../ui/Input/Input"
import cls from "./SignInForm.module.scss";
import SocketState from "../../store/SocketState";
import { observer } from "mobx-react-lite";
import { toast } from "react-toastify";

export const SignInForm = observer(() => {

    const [username, setUsername] = useState<string>("");

    const onSubmitHandler = (event : any) => {
        event.preventDefault();

        if(username) {
            SocketState.Username = username
        } else {
            toast.error("Username is required");
        }
    }

    return(
        <form className={cls.form} onSubmit={onSubmitHandler}>
            <h3 className={cls.title}>Type username</h3>
            <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={cls.input}
                label=""
                name="user" 
                placeholder="Username"

            />
            <Button>Sign in</Button>
        </form>
    )
})
import "./styles/app.scss";
import { Cursors } from "./components/Cursors/Cursors";
import { Canvas } from "./components/Canvas/Canvas";
import { SettingBar } from "./components/SettingBar/SettingBar";
import { ToolBar } from "./components/ToolBar/ToolBar";
import { Page } from "./layout/Page";
import { Sidebar } from "./layout/Sidebar";
import { Main } from "./layout/Main";
import { AppRouter } from "./router/AppRouter";
import { Top } from "./layout/Top";
import { StatusBar } from "./components/StatusBar/StatusBar";
import { Modal } from "./components/Modal/Modal";
import { SignInForm } from "./components/SignInForm/SignInForm";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { observer } from "mobx-react-lite";
import { useWebsocket } from "./hooks/useWebsocket";
import SocketState from "./store/SocketState";

export const App = observer(() => {

    useWebsocket(SocketState.Inited);

    return (
        <div className="app">
            <AppRouter>
                <Page>
                    <Top>
                        <ToolBar />
                    </Top>
                    <Sidebar>
                        <SettingBar />
                        <StatusBar />
                    </Sidebar>
                    <Main>
                        <Canvas />
                        <Cursors />
                    </Main>
                    <Modal>
                        <SignInForm/>
                    </Modal>
                </Page>
            </AppRouter>
            <ToastContainer
                position="bottom-right"
                autoClose={2000}
                theme="light"
            />
        </div>
    );
});

import "./styles/app.scss";
import { Cursors } from "./components/Cursors/Cursors";
import { Canvas } from "./components/Canvas/Canvas";
import { SettingBar } from "./components/SettingBar/SettingBar";
import { ToolBar } from "./components/ToolBar/ToolBar";
import { StatusBar } from "./components/StatusBar/StatusBar";
import { Page } from "./layout/Page";
import { Sidebar } from "./layout/Sidebar";
import { Main } from "./layout/Main";
import { AppRouter } from "./router/AppRouter";
import { Top } from "./layout/Top";

export const App = () => {
    return (
        <div className="app">
            <AppRouter>
                <Page>
                    <Top>
                        <ToolBar />
                    </Top>
                    <Sidebar>
                        <SettingBar />
                    </Sidebar>
                    <Main>
                        <Canvas />
                        <Cursors />
                        {/* <StatusBar /> */}
                    </Main>
                </Page>
            </AppRouter>
        </div>
    );
};

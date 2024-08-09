import { useEffect } from "react";
import SocketState from "../store/SocketState";
import ToolState from "../store/ToolState";
import Brush from "../tools/Brush";
import CanvasState from "../store/CanvasState";

export const useWebsocket = (isInit: boolean) => {

    useEffect(() => {

        return () => {
            SocketState.disconnect();
        }
    }, []);

    useEffect(() => {
        if(isInit) { 
            SocketState.connect();
            ToolState.setTool(new Brush(CanvasState.canvas!));
        }

    }, [isInit]);

}
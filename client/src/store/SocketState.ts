import { makeAutoObservable } from "mobx";
import { DrawData, Figures } from "../types/DrawData";
import { Point } from "../types/Shapes";
import { toast } from "react-toastify";
import Brush from "../tools/Brush";
import Bucket from "../tools/Bucket";
import Rect from "../tools/Rect";
import Line from "../tools/Line";
import Circle from "../tools/Circle";
import Eraser from "../tools/Eraser";

type MessageMethod = "connect" | "disconnect" | "draw" | "finish" | "clear" | "cursor";

const WEBSOCKET_URL = "ws://localhost:5000/";

interface Message {
  method: MessageMethod;
  id: string;
  username: string;
  drawData?: DrawData;
  cursorPosition?: Point;
}

class SocketState {
    private socket: WebSocket | null = null;
    private username: string | null = null;
    private id: string | null = null;
    private canvas: HTMLCanvasElement | null = null;
    private cursors: { [name: string]: Point } = {};
    
    constructor() {
        makeAutoObservable(this);
    }

    public get Cursors() {
        return this.cursors;
    }

    private set Cursors(cursors: { [name: string]: Point }) {
        this.cursors = cursors;
    }

    public get Username() {
        return this.username;
    }

    public get Inited() {
        return !!(this.username && this.id && this.canvas)
    }

    public set Id(id : string | null) {
        if(this.socket) return;
        this.id = id;
    }

    public set Username(username: string | null) {
        if(this.socket) return;
        this.username = username;
    }

    public set Canvas(canvas : HTMLCanvasElement) {
        if(this.socket) return;
        this.canvas = canvas;
    }
    
    public connect() {
        this.socket = new WebSocket(WEBSOCKET_URL);
        this.initOpenEvent();
        this.initCloseEvent();
        this.initMessageEvent();
    }

    public disconnect() {
        if(!this.socket)  return;

        this.sendDisconnectNotification();
        this.socket.close();
    }
    

    //socket events
    private initOpenEvent() {
        if(!this.socket) return;

        this.socket.onopen = () => {
            const message: Message = {
                id: this.id!,
                username: this.username!,
                method: "connect",
            };
            this.socket!.send(JSON.stringify(message));
        }
    }

    private initCloseEvent() {
        if(!this.socket) return;

        this.socket.onclose = () => {
            toast.error(`You has disconnected`);
            if(this.socket) { 
                this.socket.onclose = null;
                this.socket.onopen = null;
                this.socket.onerror = null;
                this.socket.onmessage = null;
                this.socket = null;
            }
            this.Id = null;
            this.Username = null;
            this.Cursors = {};
        }
    }

    private initMessageEvent() {
        if(!this.socket) return;

        this.socket.onmessage = (event: MessageEvent) => {
            const message = JSON.parse(event.data) as Message;

            switch (message.method) {
            case "connect":
                {   
                    if(this.username === message.username) {
                        toast.success(`You has connected`);
                    } else {
                        toast.success(`user ${message.username} has connected`);
                    }
                }
                break;
            case "disconnect":
                {
                    toast.error(`user ${message.username} has disconnected`);
                    if(this.cursors[message.username]) delete this.cursors[message.username];
                }
                break;
            case "draw":
                {
                    this.draw(message);
                }
                break;
            case "finish":
                {
                    this.finish();
                }
                break;
            case "clear":
                {
                    this.clear();
                }
                break;
            case "cursor": {
                this.addCursor(message);
            }
            }
        }
    }


    //socket handlers
    private draw(message : Message) {
        if(!this.canvas) return;

        const context = this.canvas.getContext("2d")!;

        if (message.drawData) {
            switch (message.drawData.figure) {
            case Figures.Brush:
                {
                    Brush.draw(message.drawData, context);
                }
                break;
            case Figures.Bucket:
                {
                    Bucket.draw(message.drawData, this.canvas);
                }
                break;
            case Figures.Rect:
                {
                    Rect.draw(message.drawData, context);
                }
                break;
            case Figures.Line:
                {
                    Line.draw(message.drawData, context);
                }
                break;
            case Figures.Circle:
                {
                    Circle.draw(message.drawData, context);
                }
                break;
            case Figures.Eraser:
                {
                    Eraser.draw(message.drawData, context);
                }
                break;
            }
        }
    }

    private finish() {
        if(!this.canvas) return;

        const context = this.canvas.getContext("2d")!;
        context.beginPath();
    }

    private clear() {
        if(!this.canvas) return;

        const context = this.canvas.getContext("2d")!;
        context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    private addCursor(message : Message) {
        const {username, cursorPosition} = message;

        if(this.username !== username && cursorPosition) {
            this.cursors[username] = cursorPosition;
        }
    }


    //socket actions
    public sendClear() {
        if(!this.socket) return;

        const message: Message = {
            id: this.id!,
            username: this.username!,
            method: "clear",
        };
        this.socket.send(JSON.stringify(message));
    }

    public sendDraw(drawData: DrawData) {
        if(!this.socket) return;

        const message: Message = {
            id: this.id!,
            username: this.username!,
            method: "draw",
            drawData,
        };
        this.socket.send(JSON.stringify(message));
    }

    public sendCursor(cursorPosition : Point) {
        if(!this.socket) return;
        
        const message: Message = {
            id: this.id!,
            username: this.username!,
            method: "cursor",
            cursorPosition,
        };
        this.socket.send(JSON.stringify(message));
    }

    public sendFinish() {
        if(!this.socket) return;

        const message: Message = {
            id: this.id!,
            username: this.username!,
            method: "finish",
        };
        this.socket.send(JSON.stringify(message));
    }

    public sendDisconnectNotification() {
        if(!this.socket) return;

        const disconnectMessage: Message = {
            id: this.id!,
            username: this.username!,
            method: "disconnect",
        };
        this.socket.send(JSON.stringify(disconnectMessage));
    }
}

export default new SocketState();

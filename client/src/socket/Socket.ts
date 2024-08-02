import { makeAutoObservable, observable } from "mobx";
import Brush from "../tools/Brush";
import Bucket from "../tools/Bucket";
import Circle from "../tools/Circle";
import Line from "../tools/Line";
import Rect from "../tools/Rect";
import { DrawData, Figures } from "../types/DrawData";
import { Point } from "../types/Shapes";
import Eraser from "../tools/Eraser";

type MessageMethod = "connection" | "draw" | "finish" | "clear" | "cursor";

interface Message {
  method: MessageMethod;
  id: string;
  username: string;
  drawData?: DrawData;
  cursorPosition?: Point;
}

class PaintSocket {
  socket: WebSocket;
  id: string;
  canvas: HTMLCanvasElement;
  cursors: { [name: string]: Point } = {};
  username: string;

  constructor(
    socket: WebSocket,
    id: string,
    canvas: HTMLCanvasElement,
    username: string
  ) {
    makeAutoObservable(this);
    this.socket = socket;
    this.id = id;
    this.canvas = canvas;
    this.username = username;
    this.initSocketEvents();
  }

  private initSocketEvents() {
    this.socket.onopen = () => {
      const message: Message = {
        id: this.id!,
        username: this.username!,
        method: "connection",
      };
      this.socket.send(JSON.stringify(message));
    };

    this.socket!.onmessage = (event: MessageEvent) => {
      const message = JSON.parse(event.data) as Message;
      switch (message.method) {
        case "connection":
          {
            console.log(`user ${message.username} is connected`);
          }
          break;
        case "draw":
          {
            this.drawHandler(message);
          }
          break;
        case "finish":
          {
            this.finishHandler();
          }
          break;
        case "clear":
          {
            this.clearHandler();
          }
          break;
        case "cursor": {
          this.cursorHandler(message);
        }
      }
    };
  }

  public sendFinish() {
    const message: Message = {
      id: this.id,
      username: this.username,
      method: "finish",
    };
    this.socket.send(JSON.stringify(message));
  }

  public sendCursor(cursorPosition: Point) {
    const message: Message = {
      id: this.id,
      username: this.username,
      method: "cursor",
      cursorPosition,
    };
    this.socket.send(JSON.stringify(message));
  }
  public sendClear() {
    const message: Message = {
      id: this.id,
      username: this.username,
      method: "clear",
    };
    this.socket.send(JSON.stringify(message));
  }

  public sendDrawData(drawData: DrawData) {
    const message: Message = {
      id: this.id,
      username: this.username,
      method: "draw",
      drawData,
    };
    this.socket.send(JSON.stringify(message));
  }

  private drawHandler(message: Message) {
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
  private setCursor(p: Point, username: string) {
    this.cursors[username] = p;
  }

  private finishHandler() {
    const context = this.canvas.getContext("2d")!;
    context.beginPath();
  }

  private clearHandler() {
    const context = this.canvas.getContext("2d")!;
    context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  private cursorHandler(message: Message) {
    const { username, cursorPosition } = message;

    if (this.username !== username) {
      this.setCursor(cursorPosition!, username);
    }
  }
}

export default PaintSocket;

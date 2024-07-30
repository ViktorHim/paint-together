import Brush from "../tools/Brush";
import Circle from "../tools/Circle";
import Line from "../tools/Line";
import Rect from "../tools/Rect";
import { DrawData, Figures } from "../types/DrawData";

type MessageMethod = "connection" | "draw" | "finish";

interface Message {
  method: MessageMethod;
  id: string;
  username: string;
  drawData?: DrawData;
}

class PaintSocket {
  socket: WebSocket;
  id: string;
  canvas: HTMLCanvasElement;
  username: string;

  constructor(
    socket: WebSocket,
    id: string,
    canvas: HTMLCanvasElement,
    username: string
  ) {
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
          console.log(`user ${message.username} is connected`);
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
            const { x, y } = message.drawData;
            Brush.draw(x, y, context);
          }
          break;
        case Figures.Rect:
          {
            const { x, y, height, width, mode } = message.drawData;
            Rect.draw(x, y, width, height, mode, context);
          }
          break;
        case Figures.Line:
          {
            const { x1, y1, x2, y2 } = message.drawData;

            Line.draw(x1, y1, x2, y2, context);
          }
          break;
        case Figures.Circle: {
          Circle.draw(message.drawData!, context);
        }
      }
    }
  }

  private finishHandler() {
    const context = this.canvas.getContext("2d")!;
    context.beginPath();
  }
}

export default PaintSocket;

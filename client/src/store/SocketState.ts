import { makeAutoObservable } from "mobx";
import PaintSocket from "../socket/Socket";

class SocketState {
  socket?: PaintSocket;
  username: string | null = null;
  id?: string;
  canvas?: HTMLCanvasElement;

  constructor() {
    makeAutoObservable(this);
  }

  setUsername(username: string) {
    this.username = username;
  }

  setId(id: string) {
    this.id = id;
  }

  setCanvas(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
  }

  initSocket(socket: WebSocket) {
    this.socket = new PaintSocket(
      socket,
      this.id!,
      this.canvas!,
      this.username!
    );
  }
}

export default new SocketState();

import { makeAutoObservable } from "mobx";
import PaintSocket from "../socket/Socket";

class SocketState {
  socket: PaintSocket | null = null;
  username: string | null = null;
  id: string = "";
  canvas?: HTMLCanvasElement;

  constructor() {
    makeAutoObservable(this);
  }

  setUsername(username: string) {
    this.username = username;
  }

  setId(id: string) {
    this.id = id;
    if (this.socket) {
      this.socket.id = id;
    }
  }

  setCanvas(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
  }

  get Cursors() {
    if (this.socket) {
      return this.socket.cursors;
    }
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

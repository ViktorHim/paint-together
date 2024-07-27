import { makeAutoObservable } from "mobx";

class CanvasState {
  canvas?: HTMLCanvasElement;
  undoList: string[] = [];
  redoList: string[] = [];
  cursorPosition: { x: number; y: number } | null = null;
  constructor() {
    makeAutoObservable(this);
  }

  setCursorPosition(x: number, y: number) {
    this.cursorPosition = { x, y };
  }

  clearCursorPosition() {
    this.cursorPosition = null;
  }

  setCanvas(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
  }

  pushToUndo(frame: string) {
    this.undoList.push(frame);
  }

  pushToRedo(frame: string) {
    this.redoList.push(frame);
  }

  canUndo() {
    return this.undoList.length !== 0;
  }

  canRedo() {
    return this.redoList.length !== 0;
  }

  undo() {
    const context = this.canvas?.getContext("2d");

    if (this.undoList.length > 0) {
      const dataUrl = this.undoList.pop();
      this.redoList.push(this.canvas!.toDataURL());
      const img = new Image();
      img.src = dataUrl!;

      img.onload = () => {
        context?.clearRect(0, 0, this.canvas!.width, this.canvas!.height);
        context?.drawImage(img, 0, 0, this.canvas!.width, this.canvas!.height);
      };
    } else {
      context?.clearRect(0, 0, this.canvas!.width, this.canvas!.height);
    }
  }

  redo() {
    const context = this.canvas?.getContext("2d");

    if (this.redoList.length > 0) {
      const dataUrl = this.redoList.pop();
      this.undoList.push(this.canvas!.toDataURL());
      const img = new Image();
      img.src = dataUrl!;

      img.onload = () => {
        context?.clearRect(0, 0, this.canvas!.width, this.canvas!.height);
        context?.drawImage(img, 0, 0, this.canvas!.width, this.canvas!.height);
      };
    }
  }
}

export default new CanvasState();

import { makeAutoObservable } from "mobx";
import Tool, { drawMode } from "../tools/Tool";
import { Settings } from "../types/Settings";



class ToolState {
    tool: Tool | null = null;
    drawMode: drawMode = "border";
    fillColor: string = "#000000";
    strokeColor: string = "#000000";
    lineWidth: number = 1;

    constructor() {
        makeAutoObservable(this);
    }

    setTool(tool: Tool) {
        this.tool = tool;
        this.tool.drawMode = this.drawMode;
        this.tool.FillColor = this.fillColor;
        this.tool.StrokeColor = this.strokeColor;
        this.tool.LineWidth = this.lineWidth;
    }

    setDrawMode(mode: drawMode) {
        if (this.tool) {
            this.tool.drawMode = mode;
            this.drawMode = mode;
        }
    }

    setFillColor(color: string) {
        if (this.tool) {
            this.tool.FillColor = color;
            this.fillColor = color;
        }
    }

    getFillColor(): string {
        return this.fillColor;
    }

    setStrokeColor(color: string) {
        if (this.tool) {
            this.tool.StrokeColor = color;
            this.strokeColor = color;
        }
    }

    setLineWidth(width: number) {
        if (this.tool) {
            this.lineWidth = width;
            this.tool.LineWidth = width;
        }
    }

    toolHasSetting(setting: Settings) : boolean {

        if(!this.tool) return false;

        switch(setting) {
        case Settings.DRAW_MODE: return this.tool.hasDrawProperty(setting);
        case Settings.LINE_WIDTH: return this.tool.hasDrawProperty(setting);
        case Settings.STROKE_COLOR: return (this.drawMode === "border" || this.drawMode === "fill" || !this.tool.hasDrawProperty(Settings.DRAW_MODE)) && this.tool.hasDrawProperty(setting);
        case Settings.FILL_COLOR: return (this.drawMode === "fill" || !this.tool.hasDrawProperty(Settings.DRAW_MODE)) && this.tool.hasDrawProperty(setting);
        case Settings.GENERAL_COLOR: return this.drawMode === "solid" && this.tool.hasDrawProperty(setting);
        default: return false;
        }
    }

    getToolName() : string {
        if(this.tool) return this.tool.ToolName;
        return '';
    }

    clearCanvas() {
        this.tool?.clear();
    }
}

export default new ToolState();

// apps/desktop/src/preload.ts
import { contextBridge, ipcRenderer } from "electron";

export const desktopApi = {
  getVersion: (): Promise<string> => ipcRenderer.invoke("app:get-version"),
  getPlatform: (): Promise<NodeJS.Platform> => ipcRenderer.invoke("app:get-platform")
};

export function exposeDesktopApi(): void {
  contextBridge.exposeInMainWorld("desktopApi", desktopApi);
}

exposeDesktopApi();

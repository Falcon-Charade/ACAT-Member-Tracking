// apps/desktop/src/preload.ts
import { contextBridge, ipcRenderer } from "electron";

const api = {
  getVersion: (): Promise<string> => ipcRenderer.invoke("app:get-version"),
  getPlatform: (): Promise<NodeJS.Platform> => ipcRenderer.invoke("app:get-platform")
};

contextBridge.exposeInMainWorld("desktopApi", api);
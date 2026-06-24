// apps/desktop/src/main.ts
import { app, BrowserWindow, ipcMain } from "electron";
import path from "node:path";

const isDev = Boolean(process.env.VITE_DEV_SERVER_URL);

function createMainWindow(): BrowserWindow {
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 1024,
    minHeight: 700,
    show: false,
    webPreferences: {
      preload: path.join(__dirname, "../preload/preload.js"),

      // Important security settings
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true
    }
  });

  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
  });

  if (isDev) {
    mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL!);
    mainWindow.webContents.openDevTools({ mode: "detach" });
  } else {
    mainWindow.loadFile(
      path.join(app.getAppPath(), "web/dist/index.html")
    );
  }

  return mainWindow;
}

app.whenReady().then(() => {
  registerIpcHandlers();
  createMainWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

function registerIpcHandlers(): void {
  ipcMain.handle("app:get-version", () => {
    return app.getVersion();
  });

  ipcMain.handle("app:get-platform", () => {
    return process.platform;
  });
}
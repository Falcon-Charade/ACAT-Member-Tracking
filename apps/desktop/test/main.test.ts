import { beforeEach, describe, expect, it, vi } from "vitest";
import path from "node:path";

const electronMock = vi.hoisted(() => {
  class BrowserWindowMock {
    static getAllWindows = vi.fn(() => []);

    options: unknown;
    listeners = new Map<string, () => void>();
    loadFile = vi.fn();
    loadURL = vi.fn();
    once = vi.fn((event: string, callback: () => void) => {
      this.listeners.set(event, callback);
    });
    show = vi.fn();
    webContents = {
      openDevTools: vi.fn()
    };

    constructor(options: unknown) {
      this.options = options;
      browserWindowInstances.push(this);
    }
  }

  const browserWindowInstances: BrowserWindowMock[] = [];

  return {
    app: {
      getAppPath: vi.fn(() => "/app"),
      getVersion: vi.fn(() => "1.2.3"),
      on: vi.fn(),
      quit: vi.fn(),
      whenReady: vi.fn(() => Promise.resolve())
    },
    BrowserWindow: BrowserWindowMock,
    browserWindowInstances,
    ipcMain: {
      handle: vi.fn()
    }
  };
});

vi.mock("electron", () => ({
  app: electronMock.app,
  BrowserWindow: electronMock.BrowserWindow,
  ipcMain: electronMock.ipcMain
}));

describe("desktop main process", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    electronMock.browserWindowInstances.length = 0;
    delete process.env.VITE_DEV_SERVER_URL;
  });

  it("creates a production window with secure defaults", async () => {
    const { createMainWindow } = await import("../src/main");

    const window = createMainWindow();

    expect(electronMock.browserWindowInstances).toHaveLength(1);
    expect(electronMock.browserWindowInstances[0]?.options).toEqual(
      expect.objectContaining({
        width: 1280,
        height: 800,
        minWidth: 1024,
        minHeight: 700,
        show: false,
        webPreferences: expect.objectContaining({
          nodeIntegration: false,
          contextIsolation: true,
          sandbox: true,
          preload: expect.stringContaining(path.join("preload", "preload.js"))
        })
      })
    );
    expect(window.loadFile).toHaveBeenCalledWith(path.join("/app", "web/dist/index.html"));
  });

  it("loads the Vite dev server when configured", async () => {
    process.env.VITE_DEV_SERVER_URL = "http://localhost:5173";
    const { createMainWindow } = await import("../src/main");

    const window = createMainWindow();

    expect(window.loadURL).toHaveBeenCalledWith("http://localhost:5173");
    expect(window.webContents.openDevTools).toHaveBeenCalledWith({ mode: "detach" });
    expect(window.loadFile).not.toHaveBeenCalled();
  });

  it("shows the window only after it is ready", async () => {
    const { createMainWindow } = await import("../src/main");

    const window = createMainWindow();

    expect(window.show).not.toHaveBeenCalled();
    window.listeners.get("ready-to-show")?.();
    expect(window.show).toHaveBeenCalledOnce();
  });

  it("registers IPC handlers for desktop metadata", async () => {
    const { registerIpcHandlers } = await import("../src/main");

    registerIpcHandlers();

    expect(electronMock.ipcMain.handle).toHaveBeenCalledWith("app:get-version", expect.any(Function));
    expect(electronMock.ipcMain.handle).toHaveBeenCalledWith("app:get-platform", expect.any(Function));

    const versionHandler = electronMock.ipcMain.handle.mock.calls.find(
      ([channel]) => channel === "app:get-version"
    )?.[1] as () => string;
    const platformHandler = electronMock.ipcMain.handle.mock.calls.find(
      ([channel]) => channel === "app:get-platform"
    )?.[1] as () => NodeJS.Platform;

    expect(versionHandler()).toBe("1.2.3");
    expect(platformHandler()).toBe(process.platform);
  });
});

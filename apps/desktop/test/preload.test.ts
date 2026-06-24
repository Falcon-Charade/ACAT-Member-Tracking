import { beforeEach, describe, expect, it, vi } from "vitest";

const electronMock = vi.hoisted(() => ({
  contextBridge: {
    exposeInMainWorld: vi.fn()
  },
  ipcRenderer: {
    invoke: vi.fn()
  }
}));

vi.mock("electron", () => ({
  contextBridge: electronMock.contextBridge,
  ipcRenderer: electronMock.ipcRenderer
}));

describe("desktop preload bridge", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("exposes the desktop API in the renderer", async () => {
    const { desktopApi, exposeDesktopApi } = await import("../src/preload");

    exposeDesktopApi();

    expect(electronMock.contextBridge.exposeInMainWorld).toHaveBeenCalledWith("desktopApi", desktopApi);
  });

  it("requests app metadata through IPC", async () => {
    electronMock.ipcRenderer.invoke
      .mockResolvedValueOnce("1.2.3")
      .mockResolvedValueOnce("win32");
    const { desktopApi } = await import("../src/preload");

    await expect(desktopApi.getVersion()).resolves.toBe("1.2.3");
    await expect(desktopApi.getPlatform()).resolves.toBe("win32");
    expect(electronMock.ipcRenderer.invoke).toHaveBeenNthCalledWith(1, "app:get-version");
    expect(electronMock.ipcRenderer.invoke).toHaveBeenNthCalledWith(2, "app:get-platform");
  });
});

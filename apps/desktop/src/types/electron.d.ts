// apps/web/src/types/electron.d.ts
export {};

declare global {
  interface Window {
    desktopApi?: {
      getVersion: () => Promise<string>;
      getPlatform: () => Promise<NodeJS.Platform>;
    };
  }
}
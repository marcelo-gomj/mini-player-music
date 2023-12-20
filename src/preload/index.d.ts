import { ElectronAPI } from '@electron-toolkit/preload'
import { IAudioMetadata } from 'music-metadata';
import howler from "./Services/Howler";
import config from "./Services/ElectronStore";
import { selectFoldersSourcesLibrary } from "./Library/updateLibrary";
import { initTest } from "./Services/Metadata";
import prisma from "./Services/Prisma";

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      checkPath: (path: string) => Promise<{ 
        meta: IAudioMetadata, 
        image: string | null 
      }>,
      howler : typeof howler,
      prisma: typeof prisma,
      config: typeof config,
      selectFoldersSourcesLibrary :  typeof selectFoldersSourcesLibrary
      initTest: typeof initTest,

    }
  }
}

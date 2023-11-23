import { ElectronAPI } from '@electron-toolkit/preload'
import { IAudioMetadata } from 'music-metadata';
import howler from "./Services/Howler";
// import store from "./Services/ElectronStore";
import { libraryChecker } from "./updateLibrary/chekFolderTest";


declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      checkPath: (path: string) => Promise<{ 
        meta: IAudioMetadata, 
        image: string | null 
      }>,
      howler : typeof howler,
      // store: typeof store
      libraryChecker:  typeof libraryChecker
    }
  }
}

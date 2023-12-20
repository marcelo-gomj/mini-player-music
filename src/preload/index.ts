import { contextBridge } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { parseFile } from "music-metadata";
import howler from './Services/Howler';
import { selectFoldersSourcesLibrary } from "./Library/updateLibrary";
import config from './Services/ElectronStore';
import { initTest } from './Services/Metadata';
import prisma from "./Services/Prisma";

async function checkPath(path: string) {
  const meta = await parseFile(path);
  const pictures = meta.common.picture;
  const image =  pictures ? pictures[0].data.toString('base64') : null ;

  // @ts-ignore
  if(pictures) meta.common.picture[0].data = []
  
  return {
    meta, 
    image
  }
}

// Custom APIs for renderer
const api = {
  checkPath,
  howler,
  prisma,
  selectFoldersSourcesLibrary,
  config,
  initTest
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}

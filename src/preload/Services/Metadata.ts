import { Stats } from "fs";
import { stat, readdir } from "fs/promises"
import { filter, flatten, isNotNil, join, or, pipe, test } from "ramda";
import { parseFile } from "music-metadata";
import { prisma } from "./Prisma";

type PathsProps = (string | PathsProps | null)[];
type T = any;
// type ReducedMetadatas = {
  // common: Omit<IAudioMetadata["common"], "picture">, 
//   format: IAudioMetadata["format"] 
// }[]

const suffixPath = (base: string ) => 
(finalPath: string) => base + "\\" + finalPath;

const sanitazePaths = pipe<T[], T[], T[]>
(flatten, filter(isNotNil));

const arrayForStringField = (list : string[] | undefined) => {
  return join(";", or(list, []));
}


const extractFileMetadata = async (paths: string[]) => {
  let errorsMetadatasPaths : string[] = [];

  for(const path of paths){
    try{
      const { 
        common: { picture, ...common }, 
        format 
      } = await parseFile(path);

      await prisma.music.create({
        data: {
          title: common.title,
          album: common.album,
          track: common.track.no,
          year: common.year,
          artist: common.artist,
          genres: arrayForStringField(common.genre),
          duration: format.duration || 0,
          music_artist: arrayForStringField(common.artists),
          label: arrayForStringField(common.label),
          
          folder: path,
          path: path,
          
          current_disc: common.disk.no,
          total_discs: common.disk.of,
          sample_rate: format.sampleRate,
          bitrate: format.bitrate,
          channels: format.numberOfChannels,
        }
      })

    }catch(err){
      console.log("ERROS", err)
      errorsMetadatasPaths = [
        ...errorsMetadatasPaths,
        path
      ]
    }
  }
  
  return errorsMetadatasPaths
}

const matchPathSupportedPaths = (path: string) => {
  const supportedPaths = /\.(MP3|MPEG|OPUS|OGG|OGA|WAV|AAC|CAF|M4A|MP4|WEBA|WEBM|DOLBY|FLAC)$/ig
  return test(supportedPaths, path)
}

const verifyFolderOrFile = async (
  elementStat : Stats,
  relativePath: string,
  subPath: boolean 
) => {
  if(elementStat.isDirectory() && subPath){
    return verifyFolders([relativePath], false)
  }

  if(elementStat.isFile() && matchPathSupportedPaths(relativePath)){
    return relativePath
  }

  return null
}


const verifyFolders = async (basePath: string[], subPath: boolean) => {
  let paths : PathsProps = [];

  for(const path of basePath){
    const rootPath = suffixPath(path)
    const folderElements = await readdir(path);

    for(const element of folderElements){
      const relativePath = rootPath(element);
      const currentElement = await stat(relativePath);

      paths = [
        ...paths, 
        await verifyFolderOrFile(
          currentElement,
          relativePath,
          subPath
        )
      ]
    }
  }

  return paths
}

const verifyFoldersAndSubfolders = async (
  paths: string[],
  subPath = true
) => {
  const sourceMusicsPaths = await verifyFolders(paths, subPath);

  return extractFileMetadata(
    sanitazePaths(sourceMusicsPaths)
  )
}

export const initTest = () => verifyFoldersAndSubfolders(["D:\\lib"])
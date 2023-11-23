import { HowlerGlobalProps } from "@renderer/types/howlerType";
import { ReactNode, createContext, useState } from "react";

type PlayerProviderProps = {
  children: ReactNode
}

type CurrentMusicProps = number | null;
type QueueGlobalProps = string[];
type PlayQueueFunction = (music: number, queue : string[]) => void;

export type PlayerHandler = {  
  playQueue: PlayQueueFunction,
  holwerGlobal:  HowlerGlobalProps,
  currentMusic: CurrentMusicProps,
  handleCurrentMusic: (isNext: boolean) => void,
  queueGlobal: QueueGlobalProps
}

const PlayerContext = createContext({} as PlayerHandler);

function PlayerProvider({ children } : PlayerProviderProps ){
  const [queueGlobal, setQueueGlobal] = useState<QueueGlobalProps>([]);
  const [currentMusic, setCurrentMusic] = useState<CurrentMusicProps>(null)
  const [holwerGlobal, setHowlerGlobal] = useState<HowlerGlobalProps>(null);

  return (
    <PlayerContext.Provider 
      value={{
        playQueue,
        holwerGlobal,
        currentMusic,
        queueGlobal,
        handleCurrentMusic
      }}
    >
      {children}
    </PlayerContext.Provider>
  )

  // play list musics
  function playQueue(music: number, queue : string[]){
    const { playContextAudio } = window.api.howler;
    const context = playContextAudio(queue, music, setCurrentMusic)
    
    setCurrentMusic(music);
    setQueueGlobal(queue);
    setHowlerGlobal(() => context)
  }

  function handleCurrentMusic(isNext: boolean){
    if(holwerGlobal && currentMusic !== null){
      const nextStep = isNext ? (currentMusic + 1) : (currentMusic - 1);

      setCurrentMusic(nextStep);

      holwerGlobal(
        { currentMusicId: nextStep }, 
        null, 
        setHowlerGlobal
      )
    }
  }

}

export {
  PlayerContext,
  PlayerProvider
}

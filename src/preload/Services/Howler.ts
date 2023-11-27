import { Howl } from "howler";
// import store from "./ElectronStore";

type StateFunctionProp <T> = ((arg: T) => void | number ) ;
type HandlerHowl <T> = ((howl: Howl, state : StateFunctionProp<T>) => void) | null;
type UpdateCurrentMusic = { 
  currentMusicId ?: number, 
  updateQueueMusics ?: string[] 
};

function playContextAudio( 
  queueMusics: string[], 
  initialCurrentMusic: number, 
  setNextMusicQueue: StateFunctionProp<number | null> 
) {
  const currentMusic = queueMusics[initialCurrentMusic];
  // create context of music
  const howlContext = new Howl({
    src : currentMusic,
    html5: true,
    volume: 0.05
  });

  howlContext.play()

  return function howlerHandler<T>(
    { currentMusicId, updateQueueMusics } : UpdateCurrentMusic,
    func ?: HandlerHowl<T>, 
    updateState ?: StateFunctionProp<T | typeof howlerHandler >,
  ){
    if(func) {
      func(howlContext, updateState || (() => {}))
      return;
    }

    // handle update current music or current queue musics
    if(updateState && currentMusicId !== undefined){
      // stop current music
      howlContext.unload();
      
      const context = playContextAudio(
        updateQueueMusics || queueMusics, 
        currentMusicId, setNextMusicQueue
      );      

      // update howler that handle current state of music
      updateState(() => context)
    }
  }
}

function currentDuration(howl: Howl, setDuration: StateFunctionProp<number>){
  setDuration(
    howl.seek()
  )
}


function setProgressMusic(howl: Howl, setProgress: StateFunctionProp<number>) {
  const progress = setProgress(0);
  
  if(progress || progress === 0){
    howl.seek(progress)
  }
}

export default {
  playContextAudio,
  currentDuration,
  setProgressMusic
}

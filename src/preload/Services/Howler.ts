import { Howl } from "howler";
import config from "./ElectronStore";

type StateFunctionProp <T> = ((arg: T) => (T | void))
type HandlerHowl <T> = (howl: Howl, state : StateFunctionProp<T>) => T;
type UpdateCurrentMusic = { 
  currentMusicId ?: number, 
  updateQueueMusics ?: string[] 
};

function playContextAudio( 
  queueMusics: string[], 
  initialCurrentMusic: number, 
  setNextMusicQueue: StateFunctionProp<number>,
  setHandleGlobal: StateFunctionProp<any>
) {
  const currentMusic = queueMusics[initialCurrentMusic];
  // create context of music
  const howlContext = new Howl({
    src : currentMusic,
    html5: true,
    volume: config("volume")
  });
  console.log(config("volume"))
  howlContext.play();

  howlContext.once('end', () => {
    howlContext.unload();
    
    const nextMusicIndex = initialCurrentMusic += 1;
    setNextMusicQueue(nextMusicIndex);
    const autoUpdateHowler = playContextAudio(
      queueMusics, 
      nextMusicIndex, 
      setNextMusicQueue, 
      setHandleGlobal
    ) 
    
    setHandleGlobal(() => autoUpdateHowler)
  })

  return function howlerHandler<T>(
    { currentMusicId, updateQueueMusics } : UpdateCurrentMusic,
    func ?: HandlerHowl<T>, 
    updateState ?: StateFunctionProp<T>,
  ){
    if(func) {
      // get access the current music info
      func(howlContext, updateState || (() => {}))
      return;
    }

    // handle update current music or current queue musics
    if(updateState && currentMusicId !== undefined){
      // stop current music
      howlContext.unload();
      
      const context = playContextAudio(
        updateQueueMusics || queueMusics, 
        currentMusicId, 
        setNextMusicQueue,
        setHandleGlobal
      );      

      // update howler that handle current state of music
      updateState(<T>(() => context))
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

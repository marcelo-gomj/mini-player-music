import { Howl } from "howler";
// import store from "./ElectronStore";

type StateFunctionProp <T> = ((arg: T) => void);
type HandlerHowl <T> = ((howl: Howl, state : StateFunctionProp<T>) => void) | null;
type UpdateCurrentMusic = { 
  currentMusicId ?: number, 
  updateQueueMusics ?: string[] 
};

function createHowlContext(musicSource: string){
  return new Howl({
    src : musicSource,
    html5: true,
    // volume: store("volume")
  });
}


function playContextAudio( 
  queueMusics: string[], 
  initialCurrentMusic: number, 
  setNextMusicQueue: StateFunctionProp<number | null> 
) {
  let howlContext = createHowlContext(
    queueMusics[initialCurrentMusic]
  );
  
  // init music
  howlContext.play();

  // set event for next music in the playlist
  howlContext.once('end', () => {
    howlContext.unload();
    const nextMusic = initialCurrentMusic += 1;
    setNextMusicQueue(nextMusic);
    howlContext = createHowlContext(queueMusics[nextMusic]);
    howlContext.play();
  })

  return function howlerHandler<T>(
    { currentMusicId, updateQueueMusics } : UpdateCurrentMusic,
    func ?: HandlerHowl<T>, 
    updateState ?: StateFunctionProp<T | typeof howlerHandler>,
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

function checkIsPlaying(howl: Howl, setIsPlay: StateFunctionProp<boolean>){
  setIsPlay(
    howl.playing()
  )
}


export default {
  playContextAudio,
  checkIsPlaying
}

import { useState } from "react";
import { ContextHowl } from "@renderer/types/howlerType";

//@ts-ignore
import Play from "../../assets/play.svg?react"
//@ts-ignore
import Pause from "../../assets/pause.svg?react"

import { map } from "ramda";

function PlayButton({ ctx : { playQueue, queueGlobal} } : ContextHowl){
  const [isPlaying] = useState(false);

  // useEffect(() => {
  //   if(!holwerGlobal) return;
    
  //   const { checkIsPlaying } = window.api.howler;
  //   holwerGlobal({}, checkIsPlaying, setIsPlaying );
  // }, [currentMusic])

  return (
    <div 
    >{      
      isPlaying ?
        <div
          // onClick={handlePauseButton}
        >
          <Pause /> 
        </div>
      : 
        <div
          onClick={handlePlayButton}
        >
          <Play />
        </div>
      }
    </div>
  )

  function handlePlayButton(){    
    if(!queueGlobal.length){
      const { libraryChecker } = window.api;
      const PATH_BASE = 'D:\\lib';

      const paths = map(
        (path) => (PATH_BASE + '\\' + path),
        libraryChecker(PATH_BASE)
      )

      playQueue(0, paths)

      return;
    }

    // if(holwerGlobal){
    //   const { playMusic } = window.api.howler;
    //   holwerGlobal({}, playMusic, setIsPlaying)
    // }

  }

  // function handlePauseButton(){
  //   if(!holwerGlobal) return;

  //   const { pauseMusic } = window.api.howler;
  //   holwerGlobal({}, pauseMusic, setIsPlaying)
  // }
}

export default PlayButton;

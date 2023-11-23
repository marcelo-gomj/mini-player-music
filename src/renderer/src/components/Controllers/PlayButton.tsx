import { useEffect, useState } from "react";
import { ContextHowl } from "@renderer/types/howlerType";

//@ts-ignore
import Play from "../../assets/play.svg?react"
//@ts-ignore
import Pause from "../../assets/pause.svg?react"

import { map } from "ramda";

function PlayButton({ ctx : { playQueue, queueGlobal, currentMusic, holwerGlobal } } : ContextHowl){
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if(!holwerGlobal) return;
    
    const { checkIsPlaying } = window.api.howler;
    
    holwerGlobal({}, checkIsPlaying, setIsPlaying );
  }, [currentMusic])

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
    const { libraryChecker } = window.api;
    const PATH_BASE = 'D:\\lib';

    if(!queueGlobal.length){
      const paths = map(
        (path) => (PATH_BASE + '\\' + path),
        libraryChecker(PATH_BASE)
      )

      console.log("PATHS", paths)
      playQueue(0, paths)

      return;
    }
  }


}

export default PlayButton;

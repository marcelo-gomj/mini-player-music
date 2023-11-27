import { PlayerContext } from "@renderer/contexts/PlayerContext";
import { useContext, useEffect, useRef, useState } from "react";
import HandleProgress from "./HandleProgressBar";

type ProgressBarProps = {
  durationTotal: number
}

function ProgressBar({ durationTotal } : ProgressBarProps) {
  const { currentMusic, holwerGlobal } = useContext(PlayerContext);
  const [duration, setDuration] = useState(0);
  const time = useRef<any>(null);

  useEffect(updateDuration, [currentMusic]);

  const calculatedProgress = progressBarUpdates(duration);
  const progressBar = { left: `-${calculatedProgress}%`};
  const progressPointer = { right : `calc(${calculatedProgress}% - 0.5rem)`}

  return (
    <div
      className="space-y-2"
    >
      <HandleProgress 
        setDuration={pointDuration}
        total={durationTotal}
      >

        <div
          className="relative h-1.5 w-full bg-base-500"
        >
          <div
            className="relative overflow-hidden rounded-md w-full h-full"
          >
            <div
              style={progressBar} 
              className="absolute group-hover:bg-white h-full top-0 w-[100%] bg-neutral-200 rounded-md duration-100 transition-[left]"
            ></div>
            
          </div> 

          <div 
            style={progressPointer}
            className={`invisible group-hover:visible absolute top-[-0.3rem] bg-[white] h-4 w-4 rounded-full duration-75 transition-[right]`}
          ></div>
        </div>
      </HandleProgress>

      <div className="flex justify-between text-[0.9rem] text-neutral-300">
        <p>{
          convertSecondsForMinutes(duration)
        }</p>
        <p>{ convertSecondsForMinutes(durationTotal || 0) }</p>
      </div>
    </div>
  )

  function fillFirstZeroTime(time: number){
    return time.toString().padStart(2, "0")
  }

  function convertSecondsForMinutes(seconds: number){
    return (
      fillFirstZeroTime(Math.trunc(seconds / 60)) 
      + ":" + 
      fillFirstZeroTime(Math.trunc(seconds % 60))
    )
  }

  function updateDuration(){
    if(!holwerGlobal) return;
    const { currentDuration } = window.api.howler;
    
    clearUpdateDurationSeconds()

    time.current = setInterval(() => {
      holwerGlobal(
        {},
        currentDuration,
        setDuration
      )
    }, 1000);

    return clearUpdateDurationSeconds;
  }

  function progressBarUpdates(duration : number){
    return (100 - Number((Math.trunc(duration) / (durationTotal / 100)).toFixed(6)))
  }

  function pointDuration(duration: number){
    setDuration(duration);
  }

  function clearUpdateDurationSeconds(){
    clearInterval(time.current)
  }
}

export default ProgressBar;
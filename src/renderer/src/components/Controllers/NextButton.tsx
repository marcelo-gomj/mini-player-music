import { ContextHowl } from "@renderer/types/howlerType";

// @ts-ignore
import Next from "../../assets/next.svg?react"
import { useEffect, useState } from "react";

function NextButton({ ctx : { handleCurrentMusic, currentMusic, queueGlobal }} : ContextHowl){
  const [hasNextMusic, setHasNextMusic] = useState(false);

  useEffect(() => {
    if(currentMusic !== null && queueGlobal[currentMusic += 1]){
      setHasNextMusic(true);
    }
  }, [currentMusic]);

  return (
    <div
      className={`${hasNextMusic ? '' : 'opacity-25'}`}
      onClick={hasNextMusic ? handleClickNextMusic : undefined}
    >
      <Next />
    </div>
  )

  function handleClickNextMusic(){
    handleCurrentMusic(true);
  }
}

export default NextButton;

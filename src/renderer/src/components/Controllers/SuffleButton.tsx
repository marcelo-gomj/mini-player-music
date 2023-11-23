import { ContextHowl } from "@renderer/types/howlerType";

//@ts-ignore
import Suffle from "../../assets/suffle.svg?react"
import { useState } from "react";


function SuffleButton({ ctx : { playQueue } } : ContextHowl){
  const [isSuffle, setIsSuffle] = useState(false);

  return (
    <div
      onClick={activeSuffle}
      className={`${isSuffle ? "": "opacity-25"}`}
    >
      <Suffle />    
    </div>
  )

  function activeSuffle(){
    setIsSuffle(!isSuffle);
  }
}

export default SuffleButton;
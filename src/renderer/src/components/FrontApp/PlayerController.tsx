import { useContext } from "react"
import { PlayerContext } from "@renderer/contexts/PlayerContext"
import * as R from "ramda";

import PlayButton from "../Controllers/PlayButton"
import PreviousButton from "../Controllers/PreviousButton";
import SuffleButton from "../Controllers/SuffleButton";
import ReapeatButton from "../Controllers/RepeatButton";
import NextButton from "../Controllers/NextButton";
import ProgressBar from "./ProgressBar";

type PlayerControllerProps = {
  durationTotal: number
}

function PlayerController({ durationTotal }){
  const PlayerHandler = useContext(PlayerContext);
  
  const buttons = [
    { title: 'suffle', ControllerItem : SuffleButton },
    { title: 'previous', ControllerItem : PreviousButton },
    { title: 'play', ControllerItem : PlayButton },
    { title: 'next', ControllerItem : NextButton },
    { title: 'repeat', ControllerItem : ReapeatButton },
  ]

  return (
    <section 
      className="space-y-6"
    >
      <ul 
        className="flex justify-between items-center"
      >
        { R.map( GenerateButtons, buttons ) }
      </ul>

      <ProgressBar durationTotal={durationTotal} />
    </section>
  )

  function GenerateButtons({ title, ControllerItem  } : typeof buttons[0]) {
    return (
      <li
        className="cursor-pointer transition-all duration-100 hover:bg-base-500 rounded-xl active:bg-base-700"
        key={title}
      >
        <ControllerItem ctx={PlayerHandler} />
      </li>
    )
  }
}

export default PlayerController;
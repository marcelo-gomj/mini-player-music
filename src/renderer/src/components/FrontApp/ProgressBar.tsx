import { PlayerContext } from "@renderer/contexts/PlayerContext";
import { useContext, useEffect, useState } from "react";

function ProgressBar() {
  const [duration, setDuration] = useState(0);

  return (
    <div
      className="space-y-2"
    >
      <div className="h-1.5 rounded-md w-full bg-base-500">
        <div className="w-[30%] h-full bg-neutral-200 hover:bg-white rounded-md"></div>
      </div>

      <div className="flex justify-between text-[0.9rem] text-neutral-300">
        <p>{duration ? duration : '0:00' }</p>
        <p>3:12</p>
      </div>
    </div>
  )
}

export default ProgressBar;
import { PlayerContext } from "@renderer/contexts/PlayerContext";
import { ReactNode, useContext, useRef } from "react";

type HandleProgressProps = {
	children: ReactNode,
	total ?: number,
  setDuration: (duration: number ) => void
}

function HandleProgress({ children, total, setDuration } : HandleProgressProps){
	const { holwerGlobal } = useContext(PlayerContext);
  const progressBarRef = useRef<HTMLDivElement>(null)

	return (
	  <div
      onClick={handleClickProgressBar}
      ref={progressBarRef}
      className="group relative py-4 cursor-pointer z-999"
    >
    	{children}
    </div>
	)

	function handleClickProgressBar(event : React.MouseEvent<HTMLDivElement, MouseEvent>){
    if(!holwerGlobal || !progressBarRef.current || !total) return;

    const { setProgressMusic } = window.api.howler;

    // get width and click point for handle the music duration 
    const progressBar = progressBarRef.current.getBoundingClientRect();
    const percentageClicked = (( event.clientX - progressBar.left) / progressBar.width) * 100;
    const clickedDuration = (percentageClicked / 100) * total;
    
    setDuration(clickedDuration)
    holwerGlobal(
      {},
      setProgressMusic,
      _ => clickedDuration
    )
  }
}

export default HandleProgress;

import { ContextHowl } from "@renderer/types/howlerType";

//@ts-ignore
import Previous from "../../assets/previous.svg?react"

function PreviousButton({ ctx : { handleCurrentMusic } } : ContextHowl){
  return (
    <div
      onClick={handleClickPrevious}
    >
      <Previous />
    </div>
  )

  function handleClickPrevious(){
    handleCurrentMusic(false);
  }
}

export default PreviousButton;

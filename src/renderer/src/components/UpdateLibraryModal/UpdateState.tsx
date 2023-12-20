import { useEffect, useRef, useState } from "react";
import CircleProgressBar from "./CircleProgressBar";

type UpdateStateProps = {
  paths: string[]
}

type Status = "scanning" | "updating" | "updated";
type loggerProps = {
  status: Status,
  musicsTotal: number,
  updateds: number,
  erros: string[]
}

function UpdateState({ paths }: UpdateStateProps) {
  const ref = useRef<any>(null);
  const [logger, setLogger] = useState<loggerProps>({
    status: "scanning",
    musicsTotal: 0,
    updateds: 0,
    erros: []
  });

  useEffect(verifyMusicsTeste, [logger]);

  useEffect(addMusicsTeste, [logger]);
  
  const isScanning = logger.status === 'scanning';
  const [radiusProgress, progress] = calcProgressStatus();

  return (
    <div className="relative">
      <div
        className="flex relative justify-center items-center h-[50vh] w-full"
      >
        {
          isScanning ? 
          null : 
          <div className="absolute  flex justify-center items-center left-0 top-0 h-full w-full">
            <div className="text-[3rem] font-medium text-[white]">{progress}%</div>
          </div> 
        }

        <CircleProgressBar 
          isScanning={isScanning} 
          radiusProgress={radiusProgress}        
        />
      </div>

      <div className="text-center font-medium text-neutral-400">
        {showUpdatingStatus(logger.status)}
      </div>

      { logger.status === "updated" ?
        <div className="absolute gap-4 flex w-full bottom-[-25%]">
          <div className="py-2 w-[50%] text-center cursor-pointer">Adicionar mais</div>
          <div className="py-2 w-[50%] text-center cursor-pointer bg-base-400 rounded-full
          ">Ver músicas</div>
        </div>
        :
        null
      }
    </div>
  )

  function calcProgressStatus() {
    const currentProgress = Math.ceil((63 / logger.musicsTotal) * logger.updateds);
    const porcetagem = ((currentProgress / 63) * 100).toFixed(0);

    return [currentProgress, porcetagem];
  }

  function verifyMusicsTeste(){
    
    if (logger.musicsTotal < 440 && logger.updateds === 0) {
      clearTimeout(ref.current);
      
      ref.current = setTimeout(() => {
        setLogger({
          ...logger,
          musicsTotal: logger.musicsTotal += 1
        })
      }, 10)

      return () => {
        clearTimeout(ref.current);
      }
    }

    return () => {
      clearTimeout(ref.current);
    }
  }

  function addMusicsTeste(){
    
    if(logger.musicsTotal === 440 && logger.updateds < 440){
      
      clearTimeout(ref.current);

      ref.current = setTimeout(() => {
        setLogger({
          ...logger,
          status: "updating",
          updateds: logger.updateds += 1
        })
      }, 20)
    }

    if(logger.musicsTotal === 440 && logger.updateds === 440){
      setLogger({
        ...logger,
        status: "updated"
      })
    }
  }

  function showUpdatingStatus(status: Status){
    return {
      "scanning" : `${logger.musicsTotal} arquivos de músicas verificados`,
      "updating" : `Adicionando ${logger.updateds} de ${logger.musicsTotal}`,
      "updated" : `${logger.updateds} músicas adicionados`,
    }[status]
  } 
}

export default UpdateState;
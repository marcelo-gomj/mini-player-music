//@ts-ignore
import DeletePathIcon from "../../assets/Close.svg?react";
import { ModalContext } from "@renderer/contexts/ModalContainer";
import { useContext, useEffect, useState } from "react";

type SelectFoldersProps = {
  pathsFolders : string[],
  addFolders: () => void,
  updateLibrarySource: (update: boolean) => void,
  removePath: (index: number) => void
}

function SelectFolders({
  pathsFolders,
  addFolders,
  updateLibrarySource,
  removePath
} : SelectFoldersProps
){
  const { handleCustomizeModal } = useContext(ModalContext);

  useEffect( setModalActions, []);

  return (
    <div className="flex flex-col w-full h-full">
      <div
        className="flex flex-col gap-3 overflow-y-scroll p-3 mb-3 w-full min-h-[15rem] max-h-[25rem] text-neutral-400 bar-scroll"
      >
        {
          pathsFolders.map( (path, index) => {
            return (
              <PathItem 
                removePath={() => removePath(index)} 
                key={index} 
                path={path} 
              />
            )
          })
        }
      </div>
      
      {/* <div className="flex justify-center text-center h-10">
        <div
          className="w-[50%] py-2 my-auto cursor-pointer"
          onClick={addFolders}
        >
          Adicinar pastas
        </div>
        <div
          className="w-[50%] py-2 my-auto cursor-pointer bg-base-400 rounded-3xl"
          onClick={() => updateLibrarySource(true)}
        >
          Atualizar
        </div>
      </div> */}
    </div>
  )

  function setModalActions(){
    handleCustomizeModal({
      title: 'Seleciona as pasta de músicas',
      buttonLeft : ['Adicionar pastas', addFolders],
      buttonRigth: ['Atualizar', () => updateLibrarySource(true)]
    })
  }
}

function PathItem(
  { path, removePath }: 
  { path: string, removePath: () => void, }
){
  const [closeIcon, setCloseIcon ] = useState(false);
  return (
    <div
      title={path} 
      onMouseOver={() => setCloseIcon(true)}
      onMouseOut={() => setCloseIcon(false)}
      onClick={removePath}
      className="group flex gap-2 justify-between relative hover:text-white cursor-pointer"
    >
      <p className="line-clamp-3 text-[0.92rem]">{ path }</p>
      { closeIcon ? 
        <div className="h-full">
          <div className="flex items-center relative h-full bg-base-100">
            <DeletePathIcon className="w-5 h-5" /> 
          </div>
        </div>

        : <span className="w-5"></span> 
      }
    </div>
  )
}

export default SelectFolders;
// @ts-ignore
import Library from "../../assets/playlist.svg?react";
// @ts-ignore
import Eq from "../../assets/equalizer.svg?react";
// @ts-ignore
import Config from "../../assets/setting.svg?react";
// @ts-ignore
import Volume from "../../assets/volume.svg?react";
import { map }from "ramda";

function MoreTools(){
  const tools = [
    {
      title: "library",
      Icon: Library,
      handle: () => {}
    },
    {
      title: "Eq",
      Icon: Eq,
      handle: () => {}
    },
    {
      title: "Configurations",
      Icon: Config,
      handle: () => {}
    },
    {
      title: "Volume",
      Icon: Volume,
      handle: () => {}
    },
  ]

  return (
    <section
      className="bg-base-400 px-8"
    >
      <ul
        className="flex justify-around py-4"
      >
        {map( generateToolsButtons, tools)}
      </ul>
    </section>
  )

  function generateToolsButtons({ title, Icon } : typeof tools[0]){
    return (
      <li key={title}>
        <Icon
          className="cursor-pointer w-6 h-6 opacity-50 hover:opacity-100" 
        />
      </li>
    )
  }
}


export default MoreTools;
import { Howl } from "howler";

export function playMusicsArray(queue: string[]){
  const sound = new Howl({
    src : queue,
    html5: true,
    preload: true
  })

  sound.play()
}
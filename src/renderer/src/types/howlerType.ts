import { PlayerHandler } from "@renderer/contexts/PlayerContext";

export type ContextHowl = { ctx: PlayerHandler };
export type StateFunctionProp <T> = ((arg: T) => void);
export type HandlerHowl <T> = ((howl: Howl, state : StateFunctionProp<T>) => void) | null;
export type UpdateCurrentMusic = { 
  currentMusicId ?: number, 
  updateQueueMusics ?: string[] 
};

export type HowlerGlobalProps = (<T>(
  currentMusic : UpdateCurrentMusic,
  howler ?: HandlerHowl<T>,
  updateState ?: StateFunctionProp<T>
) => void) | null;